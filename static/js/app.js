// python -m http.server (This allows json from file)

//just get everything in initially

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
    var DaddyData = importedData
    var meta = DaddyData.metadata
    
    // function unpack(d, i) {
    //     return d.map(function (d) {
    //         return d[i];
    //     });
    // }
     //I looked to make sure that there were only 153 different samples, so i <153. 
     for (var i = 0; i < 153; i++) {
        d3.select("#selDataset").append("option")
            .text(meta[i].id)
            .attr('value')
    };
    // if change then update plotly
    
    d3.selectAll("#selDataset").on("change", ()=>updatePlotly(importedData))

    init(importedData)
});



function init(importedData) {
    var DaddyData = importedData
    var meta = DaddyData.metadata
    console.log(DaddyData)
    var sample = DaddyData.samples
    
    console.log(sample[1])

    var OTU_ID = sample[1].otu_ids
    var OTU_Lab = sample[1].otu_labels
    var OTU_Lab = [OTU_Lab]
    // console.log(OTU_Lab)
    var Labels = OTU_ID.map(x => "OTU " + x)
    // console.log("yikes")
    // console.log(Labels)
    var sample_Val = sample[1].sample_values
    // sorts the values in descending order (taken from activity)
    var sample_sorted = sample_Val.sort(function sortFunction(a, b) {
        return b - a;
    });
    // console.log("sorted samples next")
    // console.log(sample_sorted)
    // cuts out th values that aren't in the first ten
    var sample_sliced = sample_sorted.slice(0, 10);
    // console.log("sliced and sorted")

   

    // day three activity 5 code
    var panel = d3.select("#sample-metadata")
    d3.select("#meta_id").text(`id:  ${meta[1].id}`)
    d3.select("#ethnic_id").text(`ethnicity:  ${meta[1].ethnicity}`)
    d3.select("#gender_id").text(`gender:  ${meta[1].gender}`)
    d3.select("age_id").text(`age:  ${meta[1].age}`)
    d3.select("#loc_id").text(`location:  ${meta[1].location}`)
    d3.select("#bbtype_id").text(`bbtype:  ${meta[1].bbtype}`)
    d3.select("#wfreq_id").text(`wfreq:  ${meta[1].wfreq}`)
 

    

    //Plotly
    var trace1 = {
        x: sample_sliced,
        y: Labels,
        type: "bar",
        orientation: "h",
        text: OTU_Lab,
        hoverinfo: { OTU_Lab },

    };

    var data = [trace1];
    // used as ref https://plotly.com/javascript/bar-charts/

    var layout = {
        xaxis: { Labels },
        yaxis: { sample_sliced },
        font: {
            family: 'Raleway, sans-serif'
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    var trace2 = {
        x: OTU_ID,
        y: sample_sorted,
        mode: 'markers',
        marker: {
            size: sample_sorted,
            color: OTU_ID
        }


    };
    var data2 = [trace2]
    var layout2 = {
        xaxis: { OTU_ID },
        yaxis: { sample_sorted },

    };

    Plotly.newPlot("bar", data, layout);
    Plotly.newPlot("bubble", data2, layout2);

};







// function FixPlotly() {
//     var dropdown_selection = d3.selectAll("#selDataset");
//     var nam_drop = dropdown_selection.value;
//     console.log("There has been a change");
//     console.log(nam_drop)
//     //charles in slack
//     // var idData = sampleData.metadata.filter(m => m.id === testSubject);

// };


//boiler plate taken from day 2 activity 9
// not only updates plotly but first metadata
function updatePlotly(importedData) {
    var dropdownMenu = d3.select("#selDataset").node();
    // Assign the dropdown menu option to a variable
    var selectedOption = +dropdownMenu.value;
    // uses the above variable to choose the subject' s metadata (office hours Day 1 of d3)
    var selectied_meta = importedData.metadata.filter(meta => meta.id === selectedOption)
    console.log(selectied_meta[0].id)
    var panel = d3.select("#sample-metadata")
    d3.select("#meta_id").text(`id:  ${selectied_meta[0].id}`)
   
    d3.select("ethnic_id").text(`ethnicity:  ${selectied_meta[0].ethnicity}`)
    d3.select("#gender_id").text(`gender:  ${selectied_meta[0].gender}`)
    d3.select("#age_id").text(`age:  ${selectied_meta[0].age}`)
    d3.select("#loc_id").text(`location:  ${selectied_meta[0].location}`)
    d3.select("#bbtype_id").text(`bbtype:  ${selectied_meta[0].bbtype}`)
    d3.select("#wfreq_id").text(`wfreq:  ${selectied_meta[0].wfreq}`)

    // console.log(selectedOption);

    
    var sample_from_dropdown = importedData.samples.filter(m=> +m.id === +selectedOption)
    console.log(sample_from_dropdown)
    
    // getting x values again copied from above
    var sample_Val = sample_from_dropdown[0].sample_values
    var sample_sorted = sample_Val.sort(function sortFunction(a, b) {
        return b - a;
    });
    var sample_sliced = sample_sorted.slice(0, 10);
    
    var OTU_ID = sample_from_dropdown[0].otu_ids
    var OTU_Lab = sample_from_dropdown[0].otu_labels
    var OTU_Lab = [OTU_Lab]
    console.log(OTU_Lab)
    // console.log(OTU_Lab)
    var Labels = OTU_ID.map(x => "OTU " + x)

    //Plotly all over again
    var trace1 = {
        x: sample_sliced,
        y: Labels,
        type: "bar",
        orientation: "h",
        text: [OTU_Lab],
    

    };

    var data = [trace1];
    // used as ref https://plotly.com/javascript/bar-charts/

    var layout = {
        xaxis: { Labels },
        yaxis: { sample_sliced },
        font: {
            family: 'Raleway, sans-serif'
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };


    var trace2 = {
        x: OTU_ID,
        y: sample_sorted,
        
        mode: 'markers',
        marker: {
            size: sample_sorted,
            color: OTU_ID
        }


    };
    var data2 = [trace2]
    var layout2 = {
        xaxis: { OTU_ID },
        yaxis: { sample_sorted },
        xaxis: {
            title: {
              text: 'OTU ID',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
    };
    Plotly.newPlot("bar", data, layout);
    Plotly.newPlot("bubble", data2, layout2);
   
}

//from irene in slack channel
//     var index=data.names.indexOf(id);
// var ids=data.samples[index].otu_ids;




// + takes a string and makes it a number
