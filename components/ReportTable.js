import { View, Text } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper';
const ReportTable = ({header,data}) => {
    console.log(header);
  return (
    <View>
      <DataTable  >
        <DataTable.Header>
            {
                header.map((title)=>(
                    <DataTable.Title>{title}</DataTable.Title>
                ))
            }
        </DataTable.Header >
        {
            data.map((rowdata)=>(
                <DataTable.Row>
                    {
                        rowdata.map((celldata)=>(
                            <DataTable.Cell >
                                {celldata}
                            </DataTable.Cell>
                        ))
                    }
                </DataTable.Row>
            ))
        }

      </DataTable>
    </View>
  )
}

export default ReportTable;