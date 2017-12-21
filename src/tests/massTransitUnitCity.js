import { newApartment, newWorkplace, newAgent } from '../simulation/generation.js';

export let massTransitUnitCity = {
    "map": {
        "network": {
            "edges": {
                "e0": {
                    "typeId": "road",
                    "startId": "n0",
                    "endId": "n1"
                },
                "e1": {
                    "typeId": "road",
                    "startId": "n1",
                    "endId": "n0"
                },
                "e2": {
                    "typeId": "road",
                    "startId": "n0",
                    "endId": "n2"
                },
                "e3": {
                    "typeId": "road",
                    "startId": "n2",
                    "endId": "n0"
                },
                "e4": {
                    "typeId": "road",
                    "startId": "n2",
                    "endId": "n3"
                },
                "e5": {
                    "typeId": "road",
                    "startId": "n3",
                    "endId": "n2"
                },
                "e6": {
                    "typeId": "road",
                    "startId": "n3",
                    "endId": "n1"
                },
                "e7": {
                    "typeId": "road",
                    "startId": "n1",
                    "endId": "n3"
                },
                "e8": {
                    "typeId": "road",
                    "startId": "n0",
                    "endId": "n4"
                },
                "e9": {
                    "typeId": "road",
                    "startId": "n4",
                    "endId": "n0"
                },
                "e10": {
                    "typeId": "road",
                    "startId": "n4",
                    "endId": "n5"
                },
                "e11": {
                    "typeId": "road",
                    "startId": "n5",
                    "endId": "n4"
                },
                "e12": {
                    "typeId": "road",
                    "startId": "n5",
                    "endId": "n1"
                },
                "e13": {
                    "typeId": "road",
                    "startId": "n1",
                    "endId": "n5"
                },
                "e14": {
                    "typeId": "road",
                    "startId": "n4",
                    "endId": "n6"
                },
                "e15": {
                    "typeId": "road",
                    "startId": "n6",
                    "endId": "n4"
                },
                "e16": {
                    "typeId": "road",
                    "startId": "n6",
                    "endId": "n7"
                },
                "e17": {
                    "typeId": "road",
                    "startId": "n7",
                    "endId": "n6"
                },
                "e18": {
                    "typeId": "road",
                    "startId": "n7",
                    "endId": "n0"
                },
                "e19": {
                    "typeId": "road",
                    "startId": "n0",
                    "endId": "n7"
                },
                "e20": {
                    "typeId": "road",
                    "startId": "n2",
                    "endId": "n8"
                },
                "e21": {
                    "typeId": "road",
                    "startId": "n8",
                    "endId": "n2"
                },
                "e22": {
                    "typeId": "road",
                    "startId": "n8",
                    "endId": "n7"
                },
                "e23": {
                    "typeId": "road",
                    "startId": "n7",
                    "endId": "n8"
                },
                "e24": {
                    "typeId": "road",
                    "startId": "n3",
                    "endId": "n9"
                },
                "e25": {
                    "typeId": "road",
                    "startId": "n9",
                    "endId": "n3"
                },
                "e26": {
                    "typeId": "road",
                    "startId": "n9",
                    "endId": "n10"
                },
                "e27": {
                    "typeId": "road",
                    "startId": "n10",
                    "endId": "n9"
                },
                "e28": {
                    "typeId": "road",
                    "startId": "n10",
                    "endId": "n2"
                },
                "e29": {
                    "typeId": "road",
                    "startId": "n2",
                    "endId": "n10"
                },
                "e30": {
                    "typeId": "road",
                    "startId": "n10",
                    "endId": "n11"
                },
                "e31": {
                    "typeId": "road",
                    "startId": "n11",
                    "endId": "n10"
                },
                "e32": {
                    "typeId": "road",
                    "startId": "n11",
                    "endId": "n8"
                },
                "e33": {
                    "typeId": "road",
                    "startId": "n8",
                    "endId": "n11"
                },
                "e34": {
                    "typeId": "road",
                    "startId": "n11",
                    "endId": "n12"
                },
                "e35": {
                    "typeId": "road",
                    "startId": "n12",
                    "endId": "n11"
                },
                "e36": {
                    "typeId": "road",
                    "startId": "n12",
                    "endId": "n13"
                },
                "e37": {
                    "typeId": "road",
                    "startId": "n13",
                    "endId": "n12"
                },
                "e38": {
                    "typeId": "road",
                    "startId": "n13",
                    "endId": "n8"
                },
                "e39": {
                    "typeId": "road",
                    "startId": "n8",
                    "endId": "n13"
                },
                "e40": {
                    "typeId": "road",
                    "startId": "n13",
                    "endId": "n14"
                },
                "e41": {
                    "typeId": "road",
                    "startId": "n14",
                    "endId": "n13"
                },
                "e42": {
                    "typeId": "road",
                    "startId": "n14",
                    "endId": "n7"
                },
                "e43": {
                    "typeId": "road",
                    "startId": "n7",
                    "endId": "n14"
                },
                "e44": {
                    "typeId": "road",
                    "startId": "n14",
                    "endId": "n15"
                },
                "e45": {
                    "typeId": "road",
                    "startId": "n15",
                    "endId": "n14"
                },
                "e46": {
                    "typeId": "road",
                    "startId": "n15",
                    "endId": "n6"
                },
                "e47": {
                    "typeId": "road",
                    "startId": "n6",
                    "endId": "n15"
                },
                "e50": {
                    "typeId": "road",
                    "startId": "n16",
                    "endId": "n17"
                },
                "e51": {
                    "typeId": "road",
                    "startId": "n17",
                    "endId": "n16"
                },
                "e52": {
                    "typeId": "road",
                    "startId": "n16",
                    "endId": "n18"
                },
                "e53": {
                    "typeId": "road",
                    "startId": "n18",
                    "endId": "n16"
                },
                "e54": {
                    "typeId": "road",
                    "startId": "n18",
                    "endId": "n19"
                },
                "e55": {
                    "typeId": "road",
                    "startId": "n19",
                    "endId": "n18"
                },
                "e56": {
                    "typeId": "road",
                    "startId": "n19",
                    "endId": "n20"
                },
                "e57": {
                    "typeId": "road",
                    "startId": "n20",
                    "endId": "n19"
                },
                "e58": {
                    "typeId": "road",
                    "startId": "n20",
                    "endId": "n21"
                },
                "e59": {
                    "typeId": "road",
                    "startId": "n21",
                    "endId": "n20"
                },
                "e60": {
                    "typeId": "road",
                    "startId": "n21",
                    "endId": "n18"
                },
                "e61": {
                    "typeId": "road",
                    "startId": "n18",
                    "endId": "n21"
                },
                "e62": {
                    "typeId": "road",
                    "startId": "n16",
                    "endId": "n22"
                },
                "e63": {
                    "typeId": "road",
                    "startId": "n22",
                    "endId": "n16"
                },
                "e64": {
                    "typeId": "road",
                    "startId": "n22",
                    "endId": "n21"
                },
                "e65": {
                    "typeId": "road",
                    "startId": "n21",
                    "endId": "n22"
                },
                "e66": {
                    "typeId": "road",
                    "startId": "n17",
                    "endId": "n23"
                },
                "e67": {
                    "typeId": "road",
                    "startId": "n23",
                    "endId": "n17"
                },
                "e68": {
                    "typeId": "road",
                    "startId": "n23",
                    "endId": "n22"
                },
                "e69": {
                    "typeId": "road",
                    "startId": "n22",
                    "endId": "n23"
                },
                "e70": {
                    "typeId": "road",
                    "startId": "n22",
                    "endId": "n24"
                },
                "e71": {
                    "typeId": "road",
                    "startId": "n24",
                    "endId": "n22"
                },
                "e72": {
                    "typeId": "road",
                    "startId": "n24",
                    "endId": "n25"
                },
                "e73": {
                    "typeId": "road",
                    "startId": "n25",
                    "endId": "n24"
                },
                "e74": {
                    "typeId": "road",
                    "startId": "n25",
                    "endId": "n23"
                },
                "e75": {
                    "typeId": "road",
                    "startId": "n23",
                    "endId": "n25"
                },
                "e76": {
                    "typeId": "road",
                    "startId": "n21",
                    "endId": "n26"
                },
                "e77": {
                    "typeId": "road",
                    "startId": "n26",
                    "endId": "n21"
                },
                "e78": {
                    "typeId": "road",
                    "startId": "n26",
                    "endId": "n24"
                },
                "e79": {
                    "typeId": "road",
                    "startId": "n24",
                    "endId": "n26"
                },
                "e80": {
                    "typeId": "road",
                    "startId": "n26",
                    "endId": "n27"
                },
                "e81": {
                    "typeId": "road",
                    "startId": "n27",
                    "endId": "n26"
                },
                "e82": {
                    "typeId": "road",
                    "startId": "n27",
                    "endId": "n20"
                },
                "e83": {
                    "typeId": "road",
                    "startId": "n20",
                    "endId": "n27"
                },
                "e84": {
                    "typeId": "road",
                    "startId": "n11",
                    "endId": "n28"
                },
                "e85": {
                    "typeId": "road",
                    "startId": "n28",
                    "endId": "n11"
                },
                "e86": {
                    "typeId": "road",
                    "startId": "n23",
                    "endId": "n29"
                },
                "e87": {
                    "typeId": "road",
                    "startId": "n29",
                    "endId": "n23"
                },
                "e88": {
                    "typeId": "train",
                    "startId": "n28",
                    "endId": "n29"
                },
                "e89": {
                    "typeId": "train",
                    "startId": "n29",
                    "endId": "n28"
                },
                "e90": {
                    "typeId": "train",
                    "startId": "n29",
                    "endId": "n30"
                },
                "e91": {
                    "typeId": "train",
                    "startId": "n30",
                    "endId": "n29"
                },
                "e92": {
                    "typeId": "train",
                    "startId": "n28",
                    "endId": "n31"
                },
                "e93": {
                    "typeId": "train",
                    "startId": "n31",
                    "endId": "n28"
                }
            },
            "nodes": {
                "n0": {
                    "coordinate": {
                        "x": -5,
                        "y": 0
                    }
                },
                "n1": {
                    "coordinate": {
                        "x": -1,
                        "y": 0,
                        "z": 0
                    }
                },
                "n2": {
                    "coordinate": {
                        "x": -5,
                        "y": 3,
                        "z": 0
                    }
                },
                "n3": {
                    "coordinate": {
                        "x": -1,
                        "y": 3,
                        "z": 0
                    }
                },
                "n4": {
                    "coordinate": {
                        "x": -5,
                        "y": -3,
                        "z": 0
                    }
                },
                "n5": {
                    "coordinate": {
                        "x": -1,
                        "y": -3,
                        "z": 0
                    }
                },
                "n6": {
                    "coordinate": {
                        "x": -9,
                        "y": -3,
                        "z": 0
                    }
                },
                "n7": {
                    "coordinate": {
                        "x": -9,
                        "y": 0,
                        "z": 0
                    }
                },
                "n8": {
                    "coordinate": {
                        "x": -9,
                        "y": 3,
                        "z": 0
                    }
                },
                "n9": {
                    "coordinate": {
                        "x": -1,
                        "y": 6,
                        "z": 0
                    }
                },
                "n10": {
                    "coordinate": {
                        "x": -5,
                        "y": 6,
                        "z": 0
                    }
                },
                "n11": {
                    "coordinate": {
                        "x": -9,
                        "y": 6,
                        "z": 0
                    }
                },
                "n12": {
                    "coordinate": {
                        "x": -13,
                        "y": 6,
                        "z": 0
                    }
                },
                "n13": {
                    "coordinate": {
                        "x": -13,
                        "y": 3,
                        "z": 0
                    }
                },
                "n14": {
                    "coordinate": {
                        "x": -13,
                        "y": 0,
                        "z": 0
                    }
                },
                "n15": {
                    "coordinate": {
                        "x": -13,
                        "y": -3,
                        "z": 0
                    }
                },
                "n16": {
                    "coordinate": {
                        "x": 3,
                        "y": 3,
                        "z": 0
                    }
                },
                "n17": {
                    "coordinate": {
                        "x": 3,
                        "y": 6,
                        "z": 0
                    }
                },
                "n18": {
                    "coordinate": {
                        "x": 3,
                        "y": 0,
                        "z": 0
                    }
                },
                "n19": {
                    "coordinate": {
                        "x": 3,
                        "y": -3,
                        "z": 0
                    }
                },
                "n20": {
                    "coordinate": {
                        "x": 7,
                        "y": -3,
                        "z": 0
                    }
                },
                "n21": {
                    "coordinate": {
                        "x": 7,
                        "y": 0,
                        "z": 0
                    }
                },
                "n22": {
                    "coordinate": {
                        "x": 7,
                        "y": 3,
                        "z": 0
                    }
                },
                "n23": {
                    "coordinate": {
                        "x": 7,
                        "y": 6,
                        "z": 0
                    }
                },
                "n24": {
                    "coordinate": {
                        "x": 11,
                        "y": 3,
                        "z": 0
                    }
                },
                "n25": {
                    "coordinate": {
                        "x": 11,
                        "y": 6,
                        "z": 0
                    }
                },
                "n26": {
                    "coordinate": {
                        "x": 11,
                        "y": 0,
                        "z": 0
                    }
                },
                "n27": {
                    "coordinate": {
                        "x": 11,
                        "y": -3,
                        "z": 0
                    }
                },
                "n28": {
                    "coordinate": {
                        "x": -9,
                        "y": 7,
                        "z": 0
                    }
                },
                "n29": {
                    "coordinate": {
                        "x": 7,
                        "y": 7,
                        "z": 0
                    }
                },
                "n30": {
                    "coordinate": {
                        "x": 21,
                        "y": 7,
                        "z": 0
                    }
                },
                "n31": {
                    "coordinate": {
                        "x": -19,
                        "y": 7,
                        "z": 0
                    }
                }
            }
        },
        "buildings": {
            "b0": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -10,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e35"
            },
            "b1": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -8,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e31"
            },
            "b2": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -7,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e31"
            },
            "b3": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -6,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e31"
            },
            "b4": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -6,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e20"
            },
            "b5": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -7,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e20"
            },
            "b6": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -8,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e20"
            },
            "b7": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -10,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e39"
            },
            "b8": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -11,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e39"
            },
            "b9": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -11,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e35"
            },
            "b10": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -12,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e35"
            },
            "b11": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -12,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e39"
            },
            "b12": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -12,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e38"
            },
            "b13": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -11,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e38"
            },
            "b14": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -10,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e38"
            },
            "b15": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -12,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e43"
            },
            "b16": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -11,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e43"
            },
            "b17": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -10,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e43"
            },
            "b18": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -8,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e21"
            },
            "b19": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -7,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e21"
            },
            "b20": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -6,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e21"
            },
            "b21": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -8,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e19"
            },
            "b22": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -7,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e19"
            },
            "b23": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -6,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e19"
            },
            "b24": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -6,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e18"
            },
            "b25": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -7,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e18"
            },
            "b26": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -8,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e18"
            },
            "b27": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -10,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e42"
            },
            "b28": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -11,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e42"
            },
            "b29": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -12,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e42"
            },
            "b30": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -12,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e47"
            },
            "b31": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -11,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e47"
            },
            "b32": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -10,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e47"
            },
            "b33": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -8,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e14"
            },
            "b34": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -7,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e14"
            },
            "b35": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -6,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e14"
            },
            "b36": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -4,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e27"
            },
            "b37": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -3,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e27"
            },
            "b38": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -2,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e27"
            },
            "b39": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -4,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e5"
            },
            "b40": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -3,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e5"
            },
            "b41": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -2,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e5"
            },
            "b42": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -4,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e4"
            },
            "b43": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -3,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e4"
            },
            "b44": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -2,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e4"
            },
            "b45": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -4,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e1"
            },
            "b46": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -3,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e1"
            },
            "b47": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -2,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e1"
            },
            "b48": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -4,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e0"
            },
            "b49": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -3,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e0"
            },
            "b50": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -2,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e0"
            },
            "b51": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -2,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e11"
            },
            "b52": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -3,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e11"
            },
            "b53": {
                ...newWorkplace(),
                "coordinate": {
                    "x": -4,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e11"
            },
            "b54": {
                ...newApartment(),
                "coordinate": {
                    "x": 4,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e66"
            },
            "b55": {
                ...newApartment(),
                "coordinate": {
                    "x": 5,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e66"
            },
            "b56": {
                ...newApartment(),
                "coordinate": {
                    "x": 6,
                    "y": 5.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e66"
            },
            "b57": {
                ...newApartment(),
                "coordinate": {
                    "x": 4,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e63"
            },
            "b58": {
                ...newApartment(),
                "coordinate": {
                    "x": 5,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e63"
            },
            "b59": {
                ...newApartment(),
                "coordinate": {
                    "x": 6,
                    "y": 3.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e63"
            },
            "b60": {
                ...newApartment(),
                "coordinate": {
                    "x": 4,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e62"
            },
            "b61": {
                ...newApartment(),
                "coordinate": {
                    "x": 5,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e62"
            },
            "b62": {
                ...newApartment(),
                "coordinate": {
                    "x": 6,
                    "y": 2.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e62"
            },
            "b63": {
                ...newApartment(),
                "coordinate": {
                    "x": 4,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e60"
            },
            "b64": {
                ...newApartment(),
                "coordinate": {
                    "x": 5,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e60"
            },
            "b65": {
                ...newApartment(),
                "coordinate": {
                    "x": 6,
                    "y": 0.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e60"
            },
            "b66": {
                ...newApartment(),
                "coordinate": {
                    "x": 6,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e61"
            },
            "b67": {
                ...newApartment(),
                "coordinate": {
                    "x": 5,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e61"
            },
            "b68": {
                ...newApartment(),
                "coordinate": {
                    "x": 4,
                    "y": -0.5,
                    "z": 0,
                    "rotation": 3.141592653589793
                },
                "edgeId": "e61"
            },
            "b69": {
                ...newApartment(),
                "coordinate": {
                    "x": 4,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e57"
            },
            "b70": {
                ...newApartment(),
                "coordinate": {
                    "x": 5,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e57"
            },
            "b71": {
                ...newApartment(),
                "coordinate": {
                    "x": 6,
                    "y": -2.5,
                    "z": 0,
                    "rotation": 0
                },
                "edgeId": "e57"
            },
            // "b72": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 8,
            //         "y": -0.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e76"
            // },
            // "b73": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 9,
            //         "y": -0.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e76"
            // },
            // "b74": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 10,
            //         "y": -0.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e76"
            // },
            // "b75": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 8,
            //         "y": -2.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e82"
            // },
            // "b76": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 9,
            //         "y": -2.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e82"
            // },
            // "b77": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 10,
            //         "y": -2.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e82"
            // },
            // "b78": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 10,
            //         "y": 0.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e77"
            // },
            // "b79": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 9,
            //         "y": 0.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e77"
            // },
            // "b80": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 8,
            //         "y": 0.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e77"
            // },
            // "b81": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 8,
            //         "y": 2.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e70"
            // },
            // "b82": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 9,
            //         "y": 2.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e70"
            // },
            // "b83": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 10,
            //         "y": 2.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e70"
            // },
            // "b84": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 10,
            //         "y": 3.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e71"
            // },
            // "b85": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 9,
            //         "y": 3.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e71"
            // },
            // "b86": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 8,
            //         "y": 3.5,
            //         "z": 0,
            //         "rotation": 0
            //     },
            //     "edgeId": "e71"
            // },
            // "b87": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 8,
            //         "y": 5.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e75"
            // },
            // "b88": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 9,
            //         "y": 5.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e75"
            // },
            // "b89": {
            //     ...newApartment(),
            //     "coordinate": {
            //         "x": 10,
            //         "y": 5.5,
            //         "z": 0,
            //         "rotation": 3.141592653589793
            //     },
            //     "edgeId": "e75"
            // },
            "b90": {
                typeId: 'subwayStation',
                dimension: {x: 2, y: .8, z: .5},
                // name: businessName(),
                // jobs: {j1: generateJob('service_employee'), j2: generateJob('service_employee'), j3: generateJob('service_employee'), j4: generateJob('service_manager')},
                coordinate: {
                    x: -9,
                    y: 7.4,
                    z: 0,
                    rotation: 3.141592653589793,
                },
                edgeId: "e84" //TODO
            },
            "b91": {
                typeId: 'subwayStation',
                dimension: {x: 2, y: .8, z: .5},
                // name: businessName(),
                // jobs: {j1: generateJob('service_employee'), j2: generateJob('service_employee'), j3: generateJob('service_employee'), j4: generateJob('service_manager')},
                coordinate: {
                    x: 7,
                    y: 7.4,
                    z: 0,
                    rotation: 3.141592653589793,
                },
                edgeId: "e84" //TODO
            }
        }
    },
    "agents": {
        "trains": {
			train1: {
				schedule: [{type: 'stop', nodeId: 'n28'}, {type: 'stop', nodeId: 'n31'}, {type: 'stop', nodeId: 'n28'}, {type: 'stop', nodeId: 'n29'}, {type: 'stop', nodeId: 'n30'}, {type: 'stop', nodeId: 'n29'}],
				state: {scheduleIndex: 0, progress: 0}
			}
		},
        "people": {}
    },
    "simulation": {
        "tick": 0,
        "prevTick": -1
    }
}
