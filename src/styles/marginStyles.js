import {spacer} from "./constants";

const marginStyles = {};

const marginFactors = [0.25, 0.5, 1, 1.5, 3];

for (let i = 0; i < 5; i++) {
  const value = marginFactors[i] * spacer;

  marginStyles[`mt${i + 1}`] = {marginTop: value};
  marginStyles[`mb${i + 1}`] = {marginBottom: value};
  marginStyles[`ml${i + 1}`] = {marginLeft: value};
  marginStyles[`mr${i + 1}`] = {marginRight: value};
}

export default marginStyles;
