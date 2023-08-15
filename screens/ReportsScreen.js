import React, { useState,useEffect } from 'react'
import { Button, Text, View} from "react-native";

import { ReportsStyles } from '../themes/default';
import DropDown from "react-native-paper-dropdown";
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { ScrollView } from "react-native";
import {quarterList}  from "../data/reports_data";
import TitleBar from '../components/TitleBar';
import ReportCard from '../components/ReportCard';
import getReports from '../services/services';
import { element } from 'prop-types';



const Reports = () => {
  const [reportData, setreportData] = useState([]);

  useEffect(() => {
    // async function fetchData(){
    //   let data = await getReports("xyz@gmail.com","NLAG","Q1")
    //   setreportData(data);
    // }
    // console.log("asesets");
    // fetchData();
    response = [["StudId", "StudName", "6/8/2023", "13/8/2023", "20/8/2023", "27/8/2023", "3/9/2023", "10/9/2023", "17/9/2023", "24/9/2023", "1/10/2023"], ["NLIV05", "Kaya", "P", "P", "P", "", "", "P", "", "", ""], ["NLIV06", "Harry potter", "P", "P", "P", "P", "P", "P", "P", "", ""], ["NLIV07", "Mona", "A", "P", "P", "P", "P", "P", "P", "", ""], ["NLIV08", "Bennet", "P", "A", "P", "P", "P", "P", "P", "", ""], ["NLIV09", "Lisa", "P", "A", "P", "", "", "P", "", "", ""], ["NLIV10", "Kaya", "P", "A", "P", "", "", "P", "", "", ""]];
    data = formatReportData(response)
    setreportData(data);
    console.log(reportData);
  }, [])
  
    function formatReportData(reportData){
      let dataKeys = reportData[0]
      let rData = reportData.slice(1);
      const data = rData.map((row) => {
        return row.reduce((result, value, index) => {
          if (["P", "A"].includes(value)) {
            let att = {};
            att[dataKeys[index]] = value;
            result["att_list"].push(att);
          }
          else {
            result[dataKeys[index]] = value;
          }
          return result;
        }, {"att_list": []});
      })
      
      return data;

      
    }
 
    return (
        <View style={ReportsStyles.container}>
          <TitleBar title="Reports"/>
            <View style={ReportsStyles.filterPane} >
                {/* <Text style={ReportsStyles.attSelectorLabel}>Quarter</Text>
                <View style={ReportsStyles.attRangeSelector}>
                <DropDown
                    label={"Quarter"}
                    mode={"outlined"}
                    visible={showQuarterDropDown}
                    showDropDown={() => setShowQuarterDropDown(true)}
                    onDismiss={() => setShowQuarterDropDown(false)}
                    value={quarter}
                    setValue={setQuarter}
                    list={quarterList}
                />
                </View> */}

                <Text style={ReportsStyles.teacherNameLabel}>Teacher Name</Text>
                <View style={ReportsStyles.teacherNameSelector}>


                </View>
                <Button title="Submit" />
            </View>
            <ScrollView style={ReportsStyles.tableContainer}>
              {
                
                reportData.map((row)=>{
                //   console.log(row);
                  return (

                    <ReportCard name={row["StudName"]} att={row["att_list"]}></ReportCard>
                  );
                })
              }
                
            </ScrollView>

        </View>
    );
};

export { Reports};
