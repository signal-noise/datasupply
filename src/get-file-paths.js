// getFilePaths: from an array of directories, 
//  find all the paths of files that are in that directory and its 
//  subdirectories optionally supply a filtering function which
//  operates on the file name

import * as fs from 'fs';
import * as path from 'path';

const defaultFileFilter = () => true; //include everything 
const defaultDirectoryFilter = (name) => name!='node_modules'; // but not node_modules

function getFilePaths( roots = ['.'], fileNameFilter = defaultFileFilter, directoryNameFilter = defaultDirectoryFilter){
  const files = [];
  const subDirs = [];
  roots.forEach(directory => {
    const fileList = fs.readdirSync(directory)
      .filter(f=>{
        const isDir = fs.lstatSync(path.join(directory,f));
        if(isDir && !directoryNameFilter(f)){ return false; }
        return true
      })
      .map(f => path.join(directory, f));
    
      files.push( ...fileList
        .filter(f => !fs.lstatSync(f).isDirectory()) //exclude directories
        .filter(fileNameFilter)); // include whatever the filter allows

    const currentSubDirs = fileList
      .filter(file => fs.lstatSync(file).isDirectory());
       
    subDirs.push( ...currentSubDirs);
  });

  if(subDirs.length === 0){ 
    return files;  // if there are no more subdirectories return just the file list
  }else{
    return [... getFilePaths(subDirs, fileNameFilter), ... files ]; // return the file list and the results of getFilePaths on subdirectories 
  }
}

export default getFilePaths;

// EXAMPLE usage...
// make a filter to get ony CSV files
// const csvFilter = (fileName) => path.extname(fileName) === '.csv';
// getFilePaths(['./data'], csvFilter) );
