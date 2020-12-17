// taken from activity 7

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
  
    // Sort the data array using the greekSearchResults value
    console.log(data);
    });