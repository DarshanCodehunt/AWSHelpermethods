const express = require("express");
const awsHelperObject = require("./awsHelper");
const app = express();

//Call this using http://localhost:3000/get-available-regions
app.use("/get-available-regions", async (req, res) => {
  try {
    const regions = await awsHelperObject.getAwsRegions();
    res.status(200).send(regions);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
});

//call this using http://localhost:3000/get-vpc/eu-west-3
app.use("/get-vpc/:region", async (req, res) => {
  try {
    const region = req.params.region;
    const vpcList = await awsHelperObject.getVpcForRegion(region);
    res.status(200).send(vpcList);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
});

//call this using http:localhost:3000/get-subnet/eu-west-3/vpc-0b32a87f22b340b90
app.use("/get-subnet/:region/:vpcId", async (req, res) => {
  try {
    const { region, vpcId } = req.params;
    const subNetList = await awsHelperObject.getSubnetForVpc(region, vpcId);
    res.status(200).send(subNetList);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
});

app.listen(3000, () => console.log("started"));
