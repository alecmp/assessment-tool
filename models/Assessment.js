const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  customerprofile: {
    company: {
      type: String
    },
    country: {
      type: String
    },
    sector: {
      type: Number
    },
    attacks: [],
    riskOfArea: Number
  },
  virtualpenetration: [
    {
      id: {
        type: String
      },
      yearOfAttack: {
        type: Date
      },
      severity: {
        type: String
      },
      attackTypeId: {
        type: String
      },
      dataRank: {
        type: Number
      }
    }
  ],
  securitycontrol: [
    {
      id: {
        type: Number
      },
      upguard: {
        type: Number,
        default: false
      },
      sucuri: {
        type: Number,
        default: false
      }
    }
  ],

  csirt: [
    {
      serviceArea: {
        type: Number
      },
      id: {
        type: Number
      },
      value: {
        type: Number
      }
    }
  ],
  survey: [
    {
      id: {
        type: Number
      },
      value: {
        type: Number
      }
    }
  ],

  results: [
    {
      id: {
        type: Number
      },
      realValue: {
        type: Number
      },
      realValueOfArea: {
        type: Number
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('assessment', AssessmentSchema);
