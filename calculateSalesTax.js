var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {
  // create object to store sales and tax
  var companySalesAndTax = {};
  for (var i in salesData) {
    var sales = aggregateSales(salesData[i]['sales']);
    var tax = taxPerProvince(sales, salesData[i]['province']);
    // assign values to the new Object
    companySalesAndTax[i] = {};
    companySalesAndTax[i]['name'] = salesData[i]['name'];
    companySalesAndTax[i]['totalSales'] = sales;
    companySalesAndTax[i]['totalTaxes'] = tax;
  }

  // group sales and tax by company
  var uniqueCompanies = findUniqueCompanies(salesData);
  var salesAndTaxByCompany = {};
  salesAndTaxByCompany[companySalesAndTax[0]['name']] = {};
  salesAndTaxByCompany[companySalesAndTax[0]['name']]['totalSales'] = 0;
  salesAndTaxByCompany[companySalesAndTax[0]['name']]['totalTaxes'] = 0;
  salesAndTaxByCompany[companySalesAndTax[1]['name']] = {};
  salesAndTaxByCompany[companySalesAndTax[1]['name']]['totalSales'] = 0;
  salesAndTaxByCompany[companySalesAndTax[1]['name']]['totalTaxes'] = 0;

  for (var i = 0; i < uniqueCompanies.length; i++) {
    for (var j in companySalesAndTax) {
      if (uniqueCompanies[i] == companySalesAndTax[j]['name']) {
        salesAndTaxByCompany[companySalesAndTax[j]['name']]['totalSales'] += companySalesAndTax[j]['totalSales'];
        salesAndTaxByCompany[companySalesAndTax[j]['name']]['totalTaxes'] += companySalesAndTax[j]['totalTaxes'];
      }

    }
  }

  return salesAndTaxByCompany;
}

// helper functions
function aggregateSales(salesArray){
  var sales = 0;
  for (var i in salesArray) {
    sales += salesArray[i];
  }
  return sales;
}

function taxPerProvince(sales, province){
  return sales * salesTaxRates[province];
}

function findUniqueCompanies (companySalesData) {
  var uniqueCompanies = [companySalesData[0].name];
  for (var i in companySalesData) {
    var matched = false;
    for (var j in uniqueCompanies) {
      if (companySalesData[i].name == uniqueCompanies[j]) {
        matched = true;
      }
      if (!matched){
        uniqueCompanies.push(companySalesData[i].name);
      }

    }
  }
  return uniqueCompanies;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/
