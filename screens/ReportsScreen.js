import React, { useState,useEffect } from 'react'
import { Button, Text, View} from "react-native";

import { ReportsStyles } from '../themes/default';
import DropDown from "react-native-paper-dropdown";
import { Table, Row, Rows } from 'react-native-reanimated-table';
import { ScrollView } from "react-native";
import {quarterList}  from "../data/reports_data";
import TitleBar from '../components/TitleBar';
import ReportCard from '../components/ReportCard';
import {getReports} from '../services/services';
import { element } from 'prop-types';
import { TeacherFilter } from '../components/TeacherFilter';
import { formatReportData } from '../services/services';
import ReportTable from '../components/ReportTable';
import { Switch } from 'react-native-paper';


const Reports = (props) => {
  const [reportData, setreportData] = useState([]);
  const [showQuarterDropDown, setShowQuarterDropDown] = useState(false);
  const [quarter, setQuarter] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  
  var response = [["StudId", "StudName", "6/8/2023", "13/8/2023", "20/8/2023", "27/8/2023", "3/9/2023", "10/9/2023", "17/9/2023", "24/9/2023", "1/10/2023"], ["NLIV05", "Kaya", "P", "P", "P", "", "", "P", "", "", ""], ["NLIV06", "Harry potter", "P", "P", "P", "P", "P", "P", "P", "", ""], ["NLIV07", "Mona", "A", "P", "P", "P", "P", "P", "P", "", ""], ["NLIV08", "Bennet", "P", "A", "P", "P", "P", "P", "P", "", ""], ["NLIV09", "Lisa", "P", "A", "P", "", "", "P", "", "", ""], ["NLIV10", "Kaya", "P", "A", "P", "", "", "P", "", "", ""]];
  useEffect(() => {
    // async function fetchData(){
    //   let data = await getReports("xyz@gmail.com","NLAG","Q1")
    //   setreportData(data);
    // }
    // console.log("asesets");
    // fetchData();
    data =  formatReportData(response)
    setreportData(data);
    // console.log(data);
  }, [])
  const onToggleSwitch=()=>{
    setIsSwitchOn(!isSwitchOn)
  }
 
    return (
        <View style={ReportsStyles.container}>
          <TitleBar title="Reports"/>
          
            <View style={ReportsStyles.filterPane} >
            <TeacherFilter centers={props.centers} 
                services={props.services} 
                departments={props.departments}
                role={props.role} 
                teachers={props.teachers} 
                userInfo={props.userInfo}
                // onValueChange={getTeacherInfo}
            />
            <Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </Text>
            </View>
            <ScrollView style={ReportsStyles.tableContainer}>
              {!isSwitchOn &&<View>
              {
                reportData.map((row)=>{
                  
                  return (
                    <ReportCard name={row["StudName"]} att={row["att_list"]} key={row["StudId"]} present_count = {row["present_days"]}absent_count = {row["absent_days"]}></ReportCard>
                    );
                  })
                }
                </View>}
                {isSwitchOn && <View>

                  <ReportTable header = {response[0]} data = {response.slice(1,)} />
                </View>}
              </ScrollView>


        </View>
    );
};

export { Reports};
