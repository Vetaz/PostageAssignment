module.exports = calculate;

function calculate(req, res) {
  console.log("Calculating rate.");
  var weight = Number(req.query.weight).toFixed(2);
  var type = req.query.type;
  var zone = Number(req.query.zone);
  var results = Number(getResults(weight, type, zone)).toFixed(2);
  var typeSpelledOut = {
    stamped: "Letters (Stamped)",
    metered: "Letters (Metered)",
    large: "Large Envelopes (Flats)",
    retail: "First-Class Package Service—Retail"
  };
  params = { weight: weight, type: typeSpelledOut[type], results: results, zone: zone };
  res.render('pages/results', params);
}

function getResults(weight, type, zone) {
  if ((type == 'stamped') && (weight <= 3.5)) {
    if (weight <= 1) {
      return .55;
    } else if (weight <= 2) {
      return .7;
    } else if (weight <= 3) {
      return .85;
    } else {
      return 1;
    }
  }
  if ((type == 'metered') && (weight <= 3.5)) {
    if (weight <= 1) {
      return .5;
    } else if (weight <= 2) {
      return .65;
    } else if (weight <= 3) {
      return .8;
    } else {
      return .95;
    }
  }
  if ((type == 'large') && (weight <= 13)) {
    return 1 + ((Math.ceil(weight) - 1) * .2)
    //EX: 1 + ((ceiling(.3) - 1) * 2) = $1.00
  }
  //lookup table for price for [zone][weight]
  price = [[
    3.8,
    3.8,
    3.8,
    3.8,
    4.6,
    4.6,
    4.6,
    4.6,
    5.3,
    5.3,
    5.3,
    5.3,
    5.9
  ],
  [
    3.8,
    3.8,
    3.8,
    3.8,
    4.6,
    4.6,
    4.6,
    4.6,
    5.3,
    5.3,
    5.3,
    5.3,
    5.9
  ],
  [
    3.85,
    3.85,
    3.85,
    3.85,
    4.65,
    4.65,
    4.65,
    4.65,
    5.35,
    5.35,
    5.35,
    5.35,
    5.95
  ],
  [
    3.9,
    3.9,
    3.9,
    3.9,
    4.7,
    4.7,
    4.7,
    4.7,
    5.4,
    5.4,
    5.4,
    5.4,
    6.05
  ],
  [
    3.95,
    3.95,
    3.95,
    3.95,
    4.75,
    4.75,
    4.75,
    4.75,
    5.45,
    5.45,
    5.45,
    5.45,
    6.15
  ],
  [
    4,
    4,
    4,
    4,
    4.8,
    4.8,
    4.8,
    4.8,
    5.5,
    5.5,
    5.5,
    5.5,
    6.2
  ], 
  [
    4.05, 
    4.05,
    4.05,
    4.05,
    4.9,
    4.9,
    4.9,
    4.9,
    5.65,
    5.65,
    5.65,
    5.65,
    6.4
  ],
  [
    4.2,
    4.2,
    4.2,
    4.2,
    5,
    5,
    5,
    5,
    5.75,
    5.75,
    5.75,
    5.75,
    6.5
  ],
  [
    4.2,
    4.2,
    4.2,
    4.2,
    5,
    5,
    5,
    5,
    5.75,
    5.75,
    5.75,
    5.75,
    6.5
  ]];

  if ((type == 'retail') && (weight <= 13)) {
    return price[zone - 1][Math.ceil(weight) - 1];
  }
  return null; //should never come here.
}