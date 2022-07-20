const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1",
  //If you have credentials file please remove the credentials block below or enter your credentials below
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const getAwsRegions = () => {
  const ec2Instance = new AWS.EC2({ apiVersion: "latest" });
  return new Promise((resolve, reject) => {
    ec2Instance.describeRegions({}, (err, { Regions }) => {
      if (err) {
        reject(err);
      } else {
        const onlyRegionNames = Regions.map((region) => region.RegionName);
        resolve(onlyRegionNames);
      }
    });
  });
};

const getVpcForRegion = (region) => {
  const ec2Instance = new AWS.EC2({ apiVersion: "latest", region: region });
  return new Promise((resolve, reject) => {
    ec2Instance.describeVpcs({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getSubnetForVpc = (region, vpcId) => {
  const ec2Instance = new AWS.EC2({ apiVersion: "latest", region: region });
  return new Promise((resolve, reject) => {
    ec2Instance.describeSubnets(
      { Filters: [{ Name: "vpc-id", Values: [vpcId] }] },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};
module.exports = { getAwsRegions, getVpcForRegion, getSubnetForVpc };
