export function generateStackedBarChart(data, height, width, color) {
    let spec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "scales": [
          {
            "name": "x",
            "type": "band",
            "range": "width",
            "paddingInner": 0.15,
            "domain": {"data": "table", "field": "x"}
          },
          {
            "name": "y",
            "type": "linear",
            "range": "height",
            "nice": true, "zero": true,
            "domain": {"data": "table", "field": "y1"}
          }
        ],
      
        "axes": [
          {"orient": "bottom", "scale": "x", "zindex": 1, "labels": false, "ticks": false},
          {"orient": "left", "scale": "y", "labels": false, "ticks": false},
        ],
      
        "marks": [
          {
            "type": "rect",
            "from": {"data": "table"},
            "encode": {
              "enter": {
                "x": {"scale": "x", "field": "x"},
                "width": {"scale": "x", "band": 1, "offset": -1},
                "y": {"scale": "y", "field": "y0"},
                "y2": {"scale": "y", "field": "y1"},
                "fill": {"value": color},
                "stroke": {"value": color},
                "strokeWidth": { "value": 1 },
              }
            }
          }
        ]
    }
    return {
        "width": width,
        "height": height,
        "padding": 5,

        "data": [
          {
            "name": "table",
            "values": data && data.map((value, index) => {
              return {"x": index, "y": value}
            }),
            "transform": [
              {
                "type": "stack",
                "groupby": ["x"],
                "field": "y"
              }
            ]
          }
        ],
        ...spec
    }
}


