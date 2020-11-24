# Breakdown of Uniform

1. **Uniform:Core** - js library for loading data and querying it. Data can be loaded via Importer plugins.
2. **Uniform:Importer:CSV** - converter to standard schema/data format - JSON
3. **Uniform:Client** - Client for querying the server at runtime or via next.js type static builds.
4. **Uniform:UI** - Really just a list of typescript interfaces. E.g. for data format and ui connections etc...
5. **Uniform:UI:ReactVis** / **Uniform:UI:SiemensAtlas** - Example implimentations of visual chart components

Uniform:Core
Loads imported data into memory and makes avaliable via a simple api, e.g.

Sample uniform configuration file

## Schema Configuration

In the root (or somewhere) of the project a `schema.js` file which outlines the data model configuration. Not all of this needs to be in version 1 but this outlines how importers would be used.

```js
import csvImporter from "@uniform/importer-csv";
import { maxLength } from "@uniform/validation";

export default {
  countries: {
    importer: csvImporter,
    importerOptions: {
      source: "./data/countries.csv",
    },
    schema: {
      iso: {
        type: "string",
        validators: [maxLength(3)],
        field: "ISO Code",
      },
      name: {
        type: "string",
        field: "Title",
      },
      position: {
        type: "geo",
        fields: ["latitude", "longitude"],
      },
    },
    relations: {
      hasOne: {
        stats: {
          model: "stats",
          key: "ISO Code",
          foreignKey: "Country ISO",
        },
      },
    },
  },
  stats: {
    importer: "json",
    importerOptions: {
      source: "./data/country_stats.json",
    },
    schema: {
      population: {
        type: "number",
        field: "Population",
      },
      gdp: {
        type: "number",
        field: "GDP",
      },
    },
    relations: {
      hasOne: {
        country: {
          model: "countries",
          key: "Country ISO",
          foreignKey: "ISO Code",
        },
      },
    },
  },
};
```

## Configure Frontend Uniform Connection

A connection is made using

```jsx
//Further up in the tree

import createLocalConnection from "@uniform/connection-local";
import createGQLConnection from "@uniform/connection-graphql";
import { UniformProvider } from "@uniform/react";

const localConnection = createLocalConnection({
  data: props.data,
});

// OR

const gqlConnection = createGQLConnection({
  endpoint: "https://atlas.dc.siemens.com/graphql",
});

return (
  <UniformProvider connection={localConnection}>
    <App />
  </UniformProvider>
);
```

## Use data inside component

Data can be queried from the uniform provider in a connection agnostic way. E.g. Talk to it the same if its local data or coming live from a uniform graphql server.

Getting data from Uniform happens in a chained way. A query is generated in a chanined way.

### Loading Data runtime

```jsx
import { createQuery } from "@uniform/core";
import { useQuery } from "@uniform/react";

const PopulationBarChart = () => {
  const [name, setName] = useState("");

  const query = createQuery()
    .find("countries")
    .select(["iso", "stats.population"])
    .sort({ "stats.population": -1 })
    .filter({ name });

  const formatters = {
    "stats.population": d3.format(".2M"),
  };

  const [data, loading] = useQuery(query);

  return (
    <>
      <SearchField value={name} onChange={setName} />
      <Chart data={data} formatters={formatters} />
    </>
  );
};
```

### Loading Data Static Build, e.g. Next.js

```jsx
import { createQuery } from "@uniform/core";
import createLocalConnection from "@uniform/connection-local";

const PopulationBarChart = ({ data }) => {
  const formatters = {
    "stats.population": d3.format(".2M"),
  };

  return <Chart data={data} formatters={formatters} />;
};

export async function getStaticProps(context) {
  const connection = createLocalConnection({
    data: props.data,
  });

  const query = createQuery()
    .find("countries")
    .select(["iso", "stats.population"])
    .sort({ "stats.population": -1 });

  const data = await query.exec(connection);

  return {
    props: {
      data,
    },
  };
}
```

### Pseudo

```js
class UniformQuery {
  constructor(query) {
    this.query = query || {};
  }

  find(model) {
    this.query.model = model;
    return this;
  }

  select(model) {
    this.query.fields = fields;
    return this;
  }

  sort(sort) {
    this.query.sort = sort;
    return this;
  }

  filter(filter) {
    this.query.filter = filter;
    return this;
  }

  async exec(connection) {
    const response = await connection.query(this.query);
    if (response.ok) {
      return response.data;
    } else {
      throw new Error(response.error);
    }
  }
}

const createQuery = () => new Query();

const useQuery = (query) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const connection = useUniformConnection();

  const queryRef = useRef(query);
  if (!isEqual(query.query, queryRef.current.query)) {
    queryRef.current = query;
  }
  const currentQuery = queryRef.current;

  useEffect(() => {
    setLoading(true);
    setError(null);
    currentQuery.current
      .exec(connection)
      .then(() => {
        setData(query.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [connection, currentQuery.current]);

  return [data, loading, error];
};
```

### Example uniform queries

```jsx
// Get a single country including relations
uniform.findOne("countries", { iso: "GBR" });

const output = {
  iso: "GBR",
  name: "Great Britain",
  position: {
    lat: 55.3781,
    long: 3.436,
  },
  stats: {
    population: 66500000,
    gdp: 2800000000,
  },
};

// Get a single country name and population
uniform
  .findOne("countries", { iso: "GBR" })
  .select(["name", "stats.population"]);

const output = {
  name: "Great Britain",
  stats: {
    population: 66500000,
  },
};

// Get  just the name of a single country
uniform.findOne("countries", { iso: "GBR" }).select(["name"]);

const output = {
  name: "Great Britain",
};

// Get all countries iso amd name
uniform.find("countries").select(["iso", "name"]);

const output = [
  {
    iso: "GBR",
    name: "Great Britain",
  },
  {
    iso: "FRA",
    name: "France",
  },
  {
    iso: "USA",
    name: "United States of America",
  },
];
```
