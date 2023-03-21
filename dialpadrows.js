import React, { useState } from "react";
import {
View ,Text,StyleSheet, TouchableOpacity 
} from 'react-native';


const Dail = ({value, equationForming}) => {
    return (
        // ()=>equationForming()
        <TouchableOpacity onPress={()=>equationForming(value.toString())}>
        <View style={styles.numberdiv}>  
           <Text style={styles.numbers}>{value}</Text>
        </View> 
        </TouchableOpacity>
        
    )
}

function DialPadRows({number,symbol,equationForming})
{
    return(
        <View style = {styles.dialpadnumbers}>
                <Dail value={number}  equationForming={equationForming}/>
                <Dail value={number+1} equationForming={equationForming}/>
                <Dail value={number+2} equationForming={equationForming}/>
                
                <TouchableOpacity onPress={()=>equationForming(symbol)}>
                <View style={styles.symbols }>
                    <Text style={styles.numbers}>{symbol}</Text>
                </View>
                </TouchableOpacity>
        </View>
    )
}

const styles =StyleSheet.create(
    {
      
      dialpadnumbers :
      {
      flexDirection : 'row',
      },
      numbers :
      {
        fontSize : 45 ,
      },
      numberdiv :
      {
        height : 60 ,
        width : 85 ,
        backgroundColor : 'orange',
        marginLeft : 10,
        marginBottom :10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 25,
        marginTop : 5,
        } ,
        symbols:
        {
        height : 60 ,
        width : 85 ,
        backgroundColor : 'tomato',
        marginLeft : 10,
        marginBottom :10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 25,
        marginTop : 5,
    }
    }
)

export default DialPadRows