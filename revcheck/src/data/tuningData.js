export const tuningData = {
  volkswagen: {
    name: "Volkswagen",
    emoji: "🇩🇪",
    models: {
      "golf-8-gti": {
        name: "Golf 8 GTI",
        year: "2020-2024",
        engine: "2.0 TSI EA888 Gen4",
        stock: { power: 245, torque: 370 },
        stages: {
          1: {
            power: 295, torque: 440,
            description: "Alleen ECU remap — geen hardware nodig",
            hardware: [],
            cost: { tune: 400, hardware: 0, total: 400 },
            risk: "laag",
            timeToInstall: "2-3u",
            reversible: true,
            notes: "Volledig reversibel. Ideaal voor dagelijks gebruik. 0-100 daalt ~0.4s"
          },
          2: {
            power: 340, torque: 490,
            description: "Remap + upgraded intercooler + downpipe",
            hardware: ["Upgraded FMIC intercooler", "Catless/sport downpipe", "BMC / K&N luchtfilter"],
            cost: { tune: 400, hardware: 1300, total: 1700 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "Betrouwbaar pakket voor dagelijks gebruik. Let op: downpipe = rijder-risico voor keuring"
          },
          3: {
            power: 420, torque: 560,
            description: "IS38 turbo upgrade + volledig uitlaatsysteem + fueling",
            hardware: ["IS38 of IS38+ turbo", "Versterkende connecting rods", "Uprated koppeling", "Volledig uitlaatsysteem", "Methanol injectie optioneel"],
            cost: { tune: 700, hardware: 4200, total: 4900 },
            risk: "gemiddeld-hoog",
            timeToInstall: "2-3 dagen",
            reversible: false,
            notes: "Niet meer OEM-betrouwbaar. Regelmatig onderhoud vereist. Niet ideaal voor dagelijks gebruik"
          }
        },
        popularTuners: ["Revo", "APR", "Unitronic", "IS20 Tuning"]
      },
      "golf-8-r": {
        name: "Golf 8 R",
        year: "2021-2024",
        engine: "2.0 TSI EA888 Gen4 4Motion",
        stock: { power: 320, torque: 420 },
        stages: {
          1: {
            power: 380, torque: 495,
            description: "ECU remap — enorme winst uit de doos",
            hardware: [],
            cost: { tune: 450, hardware: 0, total: 450 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "De Golf R reageert uitzonderlijk goed op remap. 0-100 ~4.5s vs stock 4.9s"
          },
          2: {
            power: 430, torque: 550,
            description: "Remap + downpipe + FMIC intercooler",
            hardware: ["Sport downpipe", "Front-mount intercooler upgrade", "Eventueel sport uitlaat"],
            cost: { tune: 450, hardware: 1600, total: 2050 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "Populairste combo voor de Golf R. Merkbare verbetering in hogere revs en op de autobahn"
          },
          3: {
            power: 510, torque: 640,
            description: "IS38 turbo + volledig pakket + 4WD versterking",
            hardware: ["IS38 upgrade turbo", "Versterkte koppeling", "Drivetrein versterking", "Fueling upgrade", "Injectoren upgrade"],
            cost: { tune: 800, hardware: 6000, total: 6800 },
            risk: "hoog",
            timeToInstall: "3-4 dagen",
            reversible: false,
            notes: "Op dit niveau is de drivetrein de zwakste schakel. Regelmatig onderhoud essentieel"
          }
        },
        popularTuners: ["Revo", "APR", "Forge Motorsport", "034Motorsport"]
      },
      "polo-gti": {
        name: "Polo GTI",
        year: "2018-2024",
        engine: "2.0 TSI EA888 200pk",
        stock: { power: 200, torque: 320 },
        stages: {
          1: {
            power: 245, torque: 380,
            description: "ECU remap",
            hardware: [],
            cost: { tune: 350, hardware: 0, total: 350 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "Geweldige waarde voor geld. Bijna Golf GTI power voor klein budget"
          },
          2: {
            power: 285, torque: 430,
            description: "Remap + intercooler + uitlaat",
            hardware: ["Intercooler upgrade", "Sport uitlaat", "Luchtfilter"],
            cost: { tune: 350, hardware: 900, total: 1250 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "Sterke kleine auto op dit niveau. Let op de DSG transmissie grenzen"
          },
          3: {
            power: 330, torque: 490,
            description: "Turbo + fueling upgrade",
            hardware: ["Grotere turbo", "Versterkte koppeling", "Fueling upgrade"],
            cost: { tune: 600, hardware: 3200, total: 3800 },
            risk: "gemiddeld-hoog",
            timeToInstall: "2-3 dagen",
            reversible: false,
            notes: "Op dit niveau overtreft de kleine Polo zijn originele opzet aanzienlijk"
          }
        },
        popularTuners: ["Revo", "APR", "Seat Performance"]
      }
    }
  },
  bmw: {
    name: "BMW",
    emoji: "🇩🇪",
    models: {
      "330i-g20": {
        name: "330i G20",
        year: "2019-2024",
        engine: "B48B20 2.0L Turbo",
        stock: { power: 258, torque: 400 },
        stages: {
          1: {
            power: 310, torque: 475,
            description: "ECU remap — B48 motor reageert sterk",
            hardware: [],
            cost: { tune: 500, hardware: 0, total: 500 },
            risk: "laag",
            timeToInstall: "2-3u",
            reversible: true,
            notes: "De B48 is bekend om zijn sterke response op tuning. Zeker aan te raden als eerste stap"
          },
          2: {
            power: 365, torque: 540,
            description: "Remap + downpipe + intercooler + inlaatlucht",
            hardware: ["Sport downpipe", "Intercooler upgrade", "Inlaatsysteem upgrade"],
            cost: { tune: 500, hardware: 1800, total: 2300 },
            risk: "laag-gemiddeld",
            timeToInstall: "1-2 dagen",
            reversible: false,
            notes: "Op dit niveau presteert de 330i bijna gelijk aan de stock M340i"
          },
          3: {
            power: 440, torque: 600,
            description: "Turbo upgrade + volledig pakket",
            hardware: ["Grotere turbo (MHD of equivalent)", "Fueling upgrade", "Koppeling upgrade", "Koeling upgrade"],
            cost: { tune: 800, hardware: 5500, total: 6300 },
            risk: "gemiddeld-hoog",
            timeToInstall: "3 dagen",
            reversible: false,
            notes: "Niet meer dagelijks geschikt. Hogere onderhoudskosten te verwachten"
          }
        },
        popularTuners: ["MHD", "Bootmod3", "RB Tuning", "Evolve"]
      },
      "m340i-g20": {
        name: "M340i G20",
        year: "2019-2024",
        engine: "B58B30 3.0L Inline-6",
        stock: { power: 374, torque: 500 },
        stages: {
          1: {
            power: 440, torque: 590,
            description: "ECU remap — B58 is een tuning monster",
            hardware: [],
            cost: { tune: 600, hardware: 0, total: 600 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "De B58 motor heeft bijna legendarische status in de tuning community. Geweldige betrouwbaarheid"
          },
          2: {
            power: 490, torque: 660,
            description: "Remap + sport uitlaat + intercooler",
            hardware: ["Downpipe", "Intercooler upgrade", "Sport luchtfilter", "Eventueel charge pipe"],
            cost: { tune: 600, hardware: 2400, total: 3000 },
            risk: "laag-gemiddeld",
            timeToInstall: "1-2 dagen",
            reversible: false,
            notes: "Absolute sweet-spot. Stock koppeling en aandrijflijn gaan dit makkelijk aan"
          },
          3: {
            power: 570, torque: 740,
            description: "Pure Turbos upgrade + fueling + volledig pakket",
            hardware: ["Pure Turbos PT6466 of gelijkwaardig", "Injectoren upgrade", "Methanol injectie", "Versterkte koppeling", "Koeling upgrade"],
            cost: { tune: 1000, hardware: 8500, total: 9500 },
            risk: "gemiddeld-hoog",
            timeToInstall: "4 dagen",
            reversible: false,
            notes: "Op dit niveau klopt een M3 moeiteloos. Betrouwbaarheid daalt sterk. Niet voor dagelijks gebruik"
          }
        },
        popularTuners: ["MHD", "Bootmod3", "Pure Turbos", "Dinan"]
      },
      "m3-g80": {
        name: "M3 G80",
        year: "2021-2024",
        engine: "S58B30 3.0L Biturbo",
        stock: { power: 480, torque: 550 },
        stages: {
          1: {
            power: 550, torque: 640,
            description: "ECU remap — S58 heeft enorm potentieel",
            hardware: [],
            cost: { tune: 800, hardware: 0, total: 800 },
            risk: "laag",
            timeToInstall: "2-3u",
            reversible: true,
            notes: "Al indrukwekkend op Stage 1. BMW garanteert niet bij tuning — overweeg je garantie"
          },
          2: {
            power: 620, torque: 720,
            description: "Remap + uitlaat + intercooler",
            hardware: ["Sport downpipe", "Intercooler upgrade", "Sport uitlaatsysteem"],
            cost: { tune: 800, hardware: 3500, total: 4300 },
            risk: "laag-gemiddeld",
            timeToInstall: "2 dagen",
            reversible: false,
            notes: "Op dit niveau verslaat je moeiteloos een stock Ferrari 488. Serieus"
          },
          3: {
            power: 720, torque: 850,
            description: "Pure Turbos upgrade + volledig race pakket",
            hardware: ["Pure 800 turbos", "Fueling upgrade", "Methanolkit", "Koeling upgrade", "Versterkte aandrijflijn"],
            cost: { tune: 1500, hardware: 14000, total: 15500 },
            risk: "hoog",
            timeToInstall: "5+ dagen",
            reversible: false,
            notes: "Supercar territory. Professionele begeleiding en onderhoud absoluut noodzakelijk"
          }
        },
        popularTuners: ["MHD", "Bootmod3", "Pure Turbos", "VF Engineering"]
      }
    }
  },
  audi: {
    name: "Audi",
    emoji: "🇩🇪",
    models: {
      "s3-8y": {
        name: "S3 8Y",
        year: "2021-2024",
        engine: "2.0 TFSI EA888 310pk",
        stock: { power: 310, torque: 400 },
        stages: {
          1: {
            power: 365, torque: 470,
            description: "ECU remap",
            hardware: [],
            cost: { tune: 450, hardware: 0, total: 450 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "Ideale start. Quattro aandrijving absorbeert extra vermogen vlekkeloos"
          },
          2: {
            power: 420, torque: 530,
            description: "Remap + downpipe + intercooler",
            hardware: ["Sport downpipe", "FMIC upgrade", "Charge pipe upgrade"],
            cost: { tune: 450, hardware: 1400, total: 1850 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "Immense waarde. Op dit niveau presteert de S3 als een RS3 stock"
          },
          3: {
            power: 500, torque: 620,
            description: "Hybride turbo + fueling pakket",
            hardware: ["Hybride turbo upgrade", "Injectoren upgrade", "Fueling systeem", "Versterkte koppeling"],
            cost: { tune: 700, hardware: 4800, total: 5500 },
            risk: "gemiddeld-hoog",
            timeToInstall: "2-3 dagen",
            reversible: false,
            notes: "RS3-performance voor de helft van de prijs. Betrouwbaarheid neemt af"
          }
        },
        popularTuners: ["APR", "Revo", "034Motorsport", "IE Tuning"]
      },
      "rs3-8y": {
        name: "RS3 8Y",
        year: "2021-2024",
        engine: "2.5 TFSI DAZA 400pk",
        stock: { power: 400, torque: 500 },
        stages: {
          1: {
            power: 460, torque: 590,
            description: "ECU remap — DAZA motor heeft enorm potentieel",
            hardware: [],
            cost: { tune: 700, hardware: 0, total: 700 },
            risk: "laag",
            timeToInstall: "2-3u",
            reversible: true,
            notes: "De DAZA 5-cilinder is een van de beste motoren om te tunen. Prachtig geluid bij hogere revs"
          },
          2: {
            power: 510, torque: 660,
            description: "Remap + downpipe + intercooler",
            hardware: ["Sport downpipe", "Intercooler upgrade", "Charge pipe upgrade"],
            cost: { tune: 700, hardware: 2800, total: 3500 },
            risk: "laag-gemiddeld",
            timeToInstall: "1-2 dagen",
            reversible: false,
            notes: "RS3 op Stage 2 is een absolute beast. Kapt de meeste sportauto's af op de autobahn"
          },
          3: {
            power: 610, torque: 780,
            description: "Turbo upgrade + volledig fueling + race pakket",
            hardware: ["Grotere turbo upgrade", "Injectoren upgrade", "Methanol injectie", "Fueling upgrade", "Aandrijflijn versterking"],
            cost: { tune: 1200, hardware: 10500, total: 11700 },
            risk: "hoog",
            timeToInstall: "4-5 dagen",
            reversible: false,
            notes: "Hyper-car performance. Niet voor dagelijks gebruik. Professionele ondersteuning vereist"
          }
        },
        popularTuners: ["APR", "Revo", "ABT", "MTM"]
      }
    }
  },
  mercedes: {
    name: "Mercedes-AMG",
    emoji: "🇩🇪",
    models: {
      "a45s-amg": {
        name: "A45 S AMG",
        year: "2020-2024",
        engine: "M139 2.0L 421pk",
        stock: { power: 421, torque: 500 },
        stages: {
          1: {
            power: 490, torque: 590,
            description: "ECU remap — M139 heeft meer vermogen ingebakken",
            hardware: [],
            cost: { tune: 800, hardware: 0, total: 800 },
            risk: "laag",
            timeToInstall: "2-3u",
            reversible: true,
            notes: "De sterkste productie 2.0L motor ter wereld reageert geweldig op remap"
          },
          2: {
            power: 540, torque: 660,
            description: "Remap + downpipe + intercooler upgrade",
            hardware: ["Sport downpipe", "Intercooler upgrade", "Charge pipe"],
            cost: { tune: 800, hardware: 3200, total: 4000 },
            risk: "gemiddeld",
            timeToInstall: "1-2 dagen",
            reversible: false,
            notes: "Op Stage 2 verslaat de A45S een stock Porsche 911 Carrera. Pure waanzin"
          },
          3: {
            power: 620, torque: 760,
            description: "Turbo upgrade + fueling volledig pakket",
            hardware: ["Turbo upgrade", "Injectoren upgrade", "Methanol injectie", "Versterkte koppeling", "Koeling upgrade"],
            cost: { tune: 1200, hardware: 9000, total: 10200 },
            risk: "hoog",
            timeToInstall: "4-5 dagen",
            reversible: false,
            notes: "Absolute top tier. Professionele tuner met AMG-ervaring essentieel"
          }
        },
        popularTuners: ["Weistec", "DTE Systems", "Brabus", "RENNtech"]
      }
    }
  },
  honda: {
    name: "Honda",
    emoji: "🇯🇵",
    models: {
      "civic-type-r-fl5": {
        name: "Civic Type R FL5",
        year: "2023-2024",
        engine: "K20C1 2.0L Turbo 329pk",
        stock: { power: 329, torque: 420 },
        stages: {
          1: {
            power: 375, torque: 490,
            description: "ECU remap via Hondata",
            hardware: [],
            cost: { tune: 350, hardware: 0, total: 350 },
            risk: "laag",
            timeToInstall: "1-2u",
            reversible: true,
            notes: "Honda K-serie motors zijn legendarisch betrouwbaar. Hondata is de gouden standaard voor CTR tuning"
          },
          2: {
            power: 420, torque: 560,
            description: "Hondata remap + downpipe + intercooler",
            hardware: ["Sport downpipe", "Intercooler upgrade", "Inlaatsysteem"],
            cost: { tune: 350, hardware: 1200, total: 1550 },
            risk: "laag",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "K-motoren zijn extreem betrouwbaar onder druk. Stage 2 is hier een relatief laag risico"
          },
          3: {
            power: 500, torque: 650,
            description: "Grotere turbo + volledig pakket",
            hardware: ["Upgraded turbocharger", "Fueling upgrade", "Versterkte internals", "Koeling upgrade"],
            cost: { tune: 700, hardware: 5500, total: 6200 },
            risk: "gemiddeld",
            timeToInstall: "3-4 dagen",
            reversible: false,
            notes: "K-serie aangedreven. Relatief betrouwbaar zelfs op dit niveau als het goed gebouwd is"
          }
        },
        popularTuners: ["Hondata", "KTuner", "CTR Performance"]
      }
    }
  },
  toyota: {
    name: "Toyota / Lexus",
    emoji: "🇯🇵",
    models: {
      "gr-yaris": {
        name: "GR Yaris",
        year: "2020-2024",
        engine: "G16E-GTS 1.6L 3-cil. Turbo 261pk",
        stock: { power: 261, torque: 360 },
        stages: {
          1: {
            power: 310, torque: 430,
            description: "ECU remap",
            hardware: [],
            cost: { tune: 500, hardware: 0, total: 500 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "De kleine G16 motor heeft verrassend veel tuning potentieel. Geweldige 4WD basis"
          },
          2: {
            power: 360, torque: 490,
            description: "Remap + intercooler + uitlaat",
            hardware: ["Intercooler upgrade", "Sport uitlaat", "Inlaatsysteem"],
            cost: { tune: 500, hardware: 1500, total: 2000 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "GR Yaris op Stage 2 is een absolute circuit-killer in zijn klasse"
          },
          3: {
            power: 430, torque: 580,
            description: "Grotere turbo + fueling + volledig pakket",
            hardware: ["HKS of Garrett turbo upgrade", "Fueling upgrade", "Versterkte internals"],
            cost: { tune: 800, hardware: 5000, total: 5800 },
            risk: "gemiddeld-hoog",
            timeToInstall: "3 dagen",
            reversible: false,
            notes: "Op dit niveau is de GR Yaris een serieuze rally/circuit auto"
          }
        },
        popularTuners: ["HKS", "GReddy", "GRMN Tuning", "Ecutek"]
      }
    }
  },
  ford: {
    name: "Ford",
    emoji: "🇺🇸",
    models: {
      "focus-st": {
        name: "Focus ST Mk4",
        year: "2019-2024",
        engine: "2.3 EcoBoost 280pk",
        stock: { power: 280, torque: 420 },
        stages: {
          1: {
            power: 330, torque: 490,
            description: "ECU remap",
            hardware: [],
            cost: { tune: 380, hardware: 0, total: 380 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "De 2.3 EcoBoost uit de Mustang is een robuuste motor. Reageert goed op remap"
          },
          2: {
            power: 380, torque: 550,
            description: "Remap + intercooler + uitlaat",
            hardware: ["Intercooler upgrade", "Sport downpipe", "Inlaatsysteem"],
            cost: { tune: 380, hardware: 1200, total: 1580 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "Focus ST Stage 2 verslaat veel duurdere auto's. Sterke waarde-propositie"
          },
          3: {
            power: 450, torque: 640,
            description: "Turbo upgrade + fueling",
            hardware: ["Upgraded turbocharger", "Fueling systeem", "Versterkte koppeling"],
            cost: { tune: 650, hardware: 4000, total: 4650 },
            risk: "gemiddeld",
            timeToInstall: "2-3 dagen",
            reversible: false,
            notes: "Op dit niveau overtreft de Focus ST zijn design limieten. Betrouwbaarheid neemt merkbaar af"
          }
        },
        popularTuners: ["Mountune", "Revo", "IE Tuning"]
      }
    }
  },
  renault: {
    name: "Renault",
    emoji: "🇫🇷",
    models: {
      "megane-rs": {
        name: "Mégane RS Trophy",
        year: "2018-2023",
        engine: "1.8 TCe M5Pt 300pk",
        stock: { power: 300, torque: 400 },
        stages: {
          1: {
            power: 350, torque: 470,
            description: "ECU remap",
            hardware: [],
            cost: { tune: 420, hardware: 0, total: 420 },
            risk: "laag",
            timeToInstall: "2u",
            reversible: true,
            notes: "De Renault Sport motor staat bekend om zijn betrouwbaarheid en tuning potentieel"
          },
          2: {
            power: 395, torque: 530,
            description: "Remap + intercooler + uitlaat",
            hardware: ["Intercooler upgrade", "Sport uitlaat", "Inlaatsysteem"],
            cost: { tune: 420, hardware: 1300, total: 1720 },
            risk: "laag-gemiddeld",
            timeToInstall: "1 dag",
            reversible: false,
            notes: "Mégane RS Stage 2 op een circuit is een absolute rijervaring. 4-wiel besturing maakt het speciaal"
          },
          3: {
            power: 460, torque: 600,
            description: "Turbo upgrade + fueling pakket",
            hardware: ["Grotere turbo", "Fueling upgrade", "Versterkte koppeling"],
            cost: { tune: 700, hardware: 4200, total: 4900 },
            risk: "gemiddeld-hoog",
            timeToInstall: "2-3 dagen",
            reversible: false,
            notes: "Op dit niveau is de Mégane klaar voor serieuze trackdays"
          }
        },
        popularTuners: ["RS Tuning", "Revo", "Litchfield"]
      }
    }
  }
}
