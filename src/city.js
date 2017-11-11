export let defaultCity = {
  "map": {
    "network": {
      "edges": {
        "e000": {
          "typeId": "road",
          "startId": "n000",
          "endId": "n001"
        },
        "e001": {
          "typeId": "road",
          "startId": "n001",
          "endId": "n002"
        },
        "e000r": {
          "typeId": "road",
          "startId": "n001",
          "endId": "n000"
        },
        "e001r": {
          "typeId": "road",
          "startId": "n002",
          "endId": "n001"
        }
      },
      "nodes": {
        "n000": {
          "coordinate": {
            "x": 0,
            "y": 0
          }
        },
        "n001": {
          "coordinate": {
            "x": 0,
            "y": 1
          }
        },
        "n002": {
          "coordinate": {
            "x": 0,
            "y": 2
          }
        }
      }
    },
    "buildings": {
      "b000": {
        "typeId": "work",
        "coordinate": {
          "x": 0,
          "y": 0,
          "rotation": 0
        },
        "dimension": {
          "x": 1.0,
          "y": 0.75,
          "z": 1.0
        },
        "edgeId": "e000"
      },
      "b001": {
        "typeId": "home",
        "coordinate": {
          "x": 0,
          "y": 2,
          "rotation": 0
        },
        "dimension": {
          "x": 1.0,
          "y": 0.75,
          "z": 1.0
        },
        "edgeId": "e001"
      }
    }
  },
  "agents": {
    "people": {
      "p000": {
        "workplaceId": "b000",
        "homeId": "b001",
        "position": {
          "edgeId": "e000",
          "distance": 0.3
        },
        "actions": [
          {"actionId": "travel", "buildingId": "b000"},
          {"actionId": "travel", "buildingId": "b001"},
          {"actionId": "travel", "buildingId": "b000"},
          {"actionId": "travel", "buildingId": "b001"},
          {"actionId": "travel", "buildingId": "b000"},
          {"actionId": "travel", "buildingId": "b001"},
          {"actionId": "travel", "buildingId": "b000"},
          {"actionId": "travel", "buildingId": "b001"},
          {"actionId": "travel", "buildingId": "b000"},
          {"actionId": "travel", "buildingId": "b001"}
        ]
      }
    }
  },
  "simulation": {
    "tick": 0
  }
}
