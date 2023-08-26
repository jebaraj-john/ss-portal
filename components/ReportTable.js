import { ScrollView } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";
const ReportTable = ({ header, data }) => {
    console.log(header);
    return (
        <ScrollView horizontal={true}>
            <DataTable style={{ width: 1000 }}>
                <DataTable.Header>
                    {header.map((title, index) => (
                        <DataTable.Title key={`${title}${index}${index}`}>{title}</DataTable.Title>
                    ))}
                </DataTable.Header>
                {data.map((rowdata,index) => (
                    <DataTable.Row key={"rowkey"+index}>
                        {rowdata.map((celldata, index) => (
                            <DataTable.Cell style={{}} key={`${celldata}${index}`}>
                                {celldata}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                ))}
            </DataTable>
        </ScrollView>
    );
};

export default ReportTable;
