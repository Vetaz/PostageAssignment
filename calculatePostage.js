module.exports = calculate;

function calculate(req, res) {
  console.log("Calculating rate.");
  var weight = Number(req.query.weight).toFixed(2);
  var type = req.query.type;
  var results = Number(getResults(weight, type)).toFixed(2);
  var typeSpelledOut = {
    stamped : "Letters (Stamped)",
    metered : "Letters (Metered)",
    large : "Large Envelopes (Flats)",
    retail : "First-Class Package Service—Retail"
  };
  var zone = 2;
  params = {weight: weight, type: typeSpelledOut[type], results: results, zone: zone};
  res.render('pages/results', params);
}

function getResults(weight, type) {
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
  if ((type =='metered') && (weight <= 3.5)) {
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
  if ((type == 'retail') && (weight <= 13)) {
    //Assuming it is in zone 1 & 2
    if (weight <= 4) {
      return 3.8;
    } else if (weight <= 8) {
      return 4.6;
    } else if (weight <= 12) {
      return 5.3;
    } else {
      return 5.9;
    }
  }
  return null; //should never come here.
}