export let testNetwork = {
  "edges": {
    "e0": {
      "typeId": "road",
      "startId": "n0",
      "endId": "n1"
    },
    "e1": {
      "typeId": "road",
      "startId": "n0",
      "endId": "n2"
    },
    "e2": {
      "typeId": "road",
      "startId": "n1",
      "endId": "n2"
    },
    "e3": {
      "typeId": "road",
      "startId": "n2",
      "endId": "n3"
    }
  },
  "nodes": {
    "n0": {
      "coordinate": {
        "x": 0,
        "y": 0
      }
    },
    "n1": {
      "coordinate": {
        "x": 566,
        "y": 55
      }
    },
    "n2": {
      "coordinate": {
        "x": 414,
        "y": 452
      }
    },
    "n3": {
      "coordinate": {
        "x": 481,
        "y": 530
      }
    }
  }
}

export let simpleNetwork = {
  edges: {
    "e0": {
      "typeId": "road",
      "startId": "n0",
      "endId": "n1"
    },
    "e1": {
      "typeId": "road",
      "startId": "n1",
      "endId": "n2"
    },
    "e2": {
      "typeId": "road",
      "startId": "n2",
      "endId": "n3"
    }
  },
  nodes: {
    "n0": {
      "coordinate": {"x": 0, "y": 0}
    },
    "n1": {
      "coordinate": {"x": 2, "y": 2}
    },
    "n2": {
      "coordinate": {"x": 5, "y": 5}
    },
    "n3": {
      "coordinate": {"x": 7, "y": 7}
    }
  }
}

export let littleLoopNetwork = {
  edges: {
    "e0": {
      "typeId": "road",
      "startId": "n0",
      "endId": "n1"
    },
    "e1": {
      "typeId": "road",
      "startId": "n1",
      "endId": "n0"
    }
  },
  nodes: {
    "n0": {
      "coordinate": {"x": 0, "y": 0}
    },
    "n1": {
      "coordinate": {"x": 5, "y": 0}
    }
  }
}
