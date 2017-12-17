import {newApartment, newWorkplace, newAgent} from './generation.js';

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
        },
        "e4": {
          "typeId": "road",
          "startId": "n001",
          "endId": "n3"
        },
        "e5": {
          "typeId": "road",
          "startId": "n3",
          "endId": "n001"
        },
        "e6": {
          "typeId": "road",
          "startId": "n3",
          "endId": "n4"
        },
        "e7": {
          "typeId": "road",
          "startId": "n4",
          "endId": "n3"
        },
        "e8": {
          "typeId": "road",
          "startId": "n4",
          "endId": "n5"
        },
        "e9": {
          "typeId": "road",
          "startId": "n5",
          "endId": "n4"
        },
        "e10": {
          "typeId": "road",
          "startId": "n5",
          "endId": "n000"
        },
        "e11": {
          "typeId": "road",
          "startId": "n000",
          "endId": "n5"
        },
        "e12": {
          "typeId": "road",
          "startId": "n001",
          "endId": "n6"
        },
        "e13": {
          "typeId": "road",
          "startId": "n6",
          "endId": "n001"
        },
        "e14": {
          "typeId": "road",
          "startId": "n6",
          "endId": "n7"
        },
        "e15": {
          "typeId": "road",
          "startId": "n7",
          "endId": "n6"
        },
        "e16": {
          "typeId": "road",
          "startId": "n7",
          "endId": "n5"
        },
        "e17": {
          "typeId": "road",
          "startId": "n5",
          "endId": "n7"
        },
        "e18": {
          "typeId": "road",
          "startId": "n002",
          "endId": "n8"
        },
        "e19": {
          "typeId": "road",
          "startId": "n8",
          "endId": "n002"
        },
        "e20": {
          "typeId": "road",
          "startId": "n8",
          "endId": "n9"
        },
        "e21": {
          "typeId": "road",
          "startId": "n9",
          "endId": "n8"
        },
        "e22": {
          "typeId": "road",
          "startId": "n9",
          "endId": "n3"
        },
        "e23": {
          "typeId": "road",
          "startId": "n3",
          "endId": "n9"
        },
        "e24": {
          "typeId": "road",
          "startId": "n6",
          "endId": "n10"
        },
        "e25": {
          "typeId": "road",
          "startId": "n10",
          "endId": "n6"
        },
        "e26": {
          "typeId": "road",
          "startId": "n10",
          "endId": "n8"
        },
        "e27": {
          "typeId": "road",
          "startId": "n8",
          "endId": "n10"
        },
        "e28": {
          "typeId": "road",
          "startId": "n6",
          "endId": "n11"
        },
        "e29": {
          "typeId": "road",
          "startId": "n11",
          "endId": "n6"
        },
        "e30": {
          "typeId": "road",
          "startId": "n11",
          "endId": "n12"
        },
        "e31": {
          "typeId": "road",
          "startId": "n12",
          "endId": "n11"
        },
        "e32": {
          "typeId": "road",
          "startId": "n12",
          "endId": "n7"
        },
        "e33": {
          "typeId": "road",
          "startId": "n7",
          "endId": "n12"
        },
        "e34": {
          "typeId": "road",
          "startId": "n11",
          "endId": "n13"
        },
        "e35": {
          "typeId": "road",
          "startId": "n13",
          "endId": "n11"
        },
        "e36": {
          "typeId": "road",
          "startId": "n10",
          "endId": "n13"
        },
        "e37": {
          "typeId": "road",
          "startId": "n13",
          "endId": "n10"
        },
        "e38": {
          "typeId": "road",
          "startId": "n9",
          "endId": "n14"
        },
        "e39": {
          "typeId": "road",
          "startId": "n14",
          "endId": "n9"
        },
        "e40": {
          "typeId": "road",
          "startId": "n14",
          "endId": "n15"
        },
        "e41": {
          "typeId": "road",
          "startId": "n15",
          "endId": "n14"
        },
        "e42": {
          "typeId": "road",
          "startId": "n15",
          "endId": "n3"
        },
        "e43": {
          "typeId": "road",
          "startId": "n3",
          "endId": "n15"
        },
        "e44": {
          "typeId": "road",
          "startId": "n15",
          "endId": "n16"
        },
        "e45": {
          "typeId": "road",
          "startId": "n16",
          "endId": "n15"
        },
        "e46": {
          "typeId": "road",
          "startId": "n16",
          "endId": "n4"
        },
        "e47": {
          "typeId": "road",
          "startId": "n4",
          "endId": "n16"
        }
      },
      "nodes": {
        "n000": {
          "coordinate": {
            "x": -5,
            "y": 0
          }
        },
        "n001": {
          "coordinate": {
            "x": 0,
            "y": 0
          }
        },
        "n002": {
          "coordinate": {
            "x": 5,
            "y": 0
          }
        },
        "n3": {
          "coordinate": {
            "x": 0,
            "y": 3,
            "z": 0
          }
        },
        "n4": {
          "coordinate": {
            "x": -7,
            "y": 3,
            "z": 0
          }
        },
        "n5": {
          "coordinate": {
            "x": -7,
            "y": 0,
            "z": 0
          }
        },
        "n6": {
          "coordinate": {
            "x": 0,
            "y": -3,
            "z": 0
          }
        },
        "n7": {
          "coordinate": {
            "x": -7,
            "y": -3,
            "z": 0
          }
        },
        "n8": {
          "coordinate": {
            "x": 7,
            "y": 0,
            "z": 0
          }
        },
        "n9": {
          "coordinate": {
            "x": 7,
            "y": 3,
            "z": 0
          }
        },
        "n10": {
          "coordinate": {
            "x": 7,
            "y": -3,
            "z": 0
          }
        },
        "n11": {
          "coordinate": {
            "x": 0,
            "y": -6,
            "z": 0
          }
        },
        "n12": {
          "coordinate": {
            "x": -7,
            "y": -6,
            "z": 0
          }
        },
        "n13": {
          "coordinate": {
            "x": 7,
            "y": -6,
            "z": 0
          }
        },
        "n14": {
          "coordinate": {
            "x": 7,
            "y": 6,
            "z": 0
          }
        },
        "n15": {
          "coordinate": {
            "x": 0,
            "y": 6,
            "z": 0
          }
        },
        "n16": {
          "coordinate": {
            "x": -7,
            "y": 6,
            "z": 0
          }
        }
      }
    },
    "buildings": {
      "b000": {
        ...newWorkplace(),
        "coordinate": {
          "x": -5,
          "y": -0.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 2
        },
        "edgeId": "e000"
      },
      "b001": {
        ...newApartment(),
        "coordinate": {
          "x": 5,
          "y": 0.5,
          "rotation": 0
        },
        "dimension": {
          "x": 1,
          "y": 0.75,
          "z": 1
        },
        "edgeId": "e001"
      },
      "b002": {
        ...newWorkplace(),
        "coordinate": {
          "x": -4,
          "y": -0.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      "b003": {
        ...newWorkplace(),
        "coordinate": {
          "x": -3,
          "y": -0.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.7
        },
        "edgeId": "e000"
      },
      "b004": {
        ...newWorkplace(),
        "coordinate": {
          "x": -2,
          "y": -0.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      "b005": {
        ...newWorkplace(),
        "coordinate": {
          "x": -1,
          "y": -0.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      
      "b006": {
        ...newWorkplace(),
        "coordinate": {
          "x": -4,
          "y": -2.5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 2.0
        },
        "edgeId": "e000"
      },
      "b007": {
        ...newWorkplace(),
        "coordinate": {
          "x": -3,
          "y": -2.5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.2
        },
        "edgeId": "e000"
      },
      "b008": {
        ...newWorkplace(),
        "coordinate": {
          "x": -2,
          "y": -2.5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.4
        },
        "edgeId": "e000"
      },
      "b009": {
        ...newWorkplace(),
        "coordinate": {
          "x": -1,
          "y": -2.5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      "b010": {
        ...newWorkplace(),
        "coordinate": {
          "x": -5,
          "y": -2.5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.2
        },
        "edgeId": "e000"
      },
      
      "b011": {
        ...newWorkplace(),
        "coordinate": {
          "x": -4,
          "y": 2.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      "b012": {
        ...newWorkplace(),
        "coordinate": {
          "x": -3,
          "y": 2.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.7
        },
        "edgeId": "e000"
      },
      "b013": {
        ...newWorkplace(),
        "coordinate": {
          "x": -2,
          "y": 2.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      "b014": {
        ...newWorkplace(),
        "coordinate": {
          "x": -1,
          "y": 2.5,
          "rotation": 3.141592653589793
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      
      "b015": {
        ...newWorkplace(),
        "coordinate": {
          "x": -4,
          "y": .5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 2.0
        },
        "edgeId": "e000"
      },
      "b016": {
        ...newWorkplace(),
        "coordinate": {
          "x": -3,
          "y": .5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.2
        },
        "edgeId": "e000"
      },
      "b017": {
        ...newWorkplace(),
        "coordinate": {
          "x": -2,
          "y": .5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.4
        },
        "edgeId": "e000"
      },
      "b018": {
        ...newWorkplace(),
        "coordinate": {
          "x": -1,
          "y": .5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.5
        },
        "edgeId": "e000"
      },
      "b019": {
        ...newWorkplace(),
        "coordinate": {
          "x": -5,
          "y": .5,
          "rotation": 0
        },
        "dimension": {
          "x": .8,
          "y": .8,
          "z": 1.2
        },
        "edgeId": "e000"
      },
      "b020": {
        ...newApartment(),
        "coordinate": {
          "x": 3,
          "y": 0.5,
          "rotation": 0
        },
        "dimension": {
          "x": 1,
          "y": 0.75,
          "z": 1
        },
        "edgeId": "e001"
      },
      "b021": {
        ...newApartment(),
        "coordinate": {
          "x": 3,
          "y": -0.5,
          "rotation": Math.PI
        },
        "dimension": {
          "x": 1,
          "y": 0.75,
          "z": 1
        },
        "edgeId": "e001"
      },
    }
  },
  "agents": {
    "people": {
      "p000": newAgent(),
			"p001": newAgent(),
			"p002": newAgent(),
			"p003": newAgent(),
			"p004": newAgent(),
			"p005": newAgent(),
			"p006": newAgent(),
			"p007": newAgent(),
			"p008": newAgent(),
			"p009": newAgent(),
    }
  },
  "simulation": {
    "tick": 0,
		"prevTick": -1
  }
}
