export let city = {
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
        "edgeId": "e000"
      },
      "b001": {
        "typeId": "home",
        "coordinate": {
          "x": 0,
          "y": 2,
          "rotation": 0
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
          {
            "actionId": "travel",
            "destinationId": "b000"
          },
          {
            "actionId": "work",
            "remainingTicks": 8,
            "location": "b000"
          }
        ]
      }
    }
  },
  "simulation": {
    "tick": 0
  }
}