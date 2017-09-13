export default {
  scenes: [],
  powerData: {},
  activeScene: null,
  activeStructure: null,
  activeTile: null,
  SVModal: {
    show: false,
    position: [0,0]
  },
  editor: false,
  ui: {
    resizePane: new Date(),
    viewerMode: 'chart',
  },
  legend: {
    totalLoad: true,
    totalGeneration: true,
    buffer: true,
    storage: true
  },
  time: 60*60*12
};
