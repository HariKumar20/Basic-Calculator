import React ,{useState} from "react";
import {
    View ,Text, StyleSheet ,TouchableOpacity, FlatList,
} from 'react-native';
import DialPadRows from "./dialpadrows";

function CalculatorApp()
{

    const [operand, setOperand] = useState('');
    const [subtext, setSubText]=useState('');
    const [evaluateClear , setEval]=useState(0);
    const [result,setResult]=useState(0);
    const [historyList,setHistory] = useState([]);
    var integers = ['1','2','3','4','5','6','7','8','9'];
    var operators = ['+','-','*','/','.'] ;

    const historyFunction = () =>
    {
        
            console.log("yessssss")
            setHistory((prevHistory)=>{
                prevHistory.push(operand)
                return prevHistory
            });
            if(historyList.length>10){
                setHistory((prevHistory)=>{
                    delete prevHistory[0]
                    return prevHistory
                });
                
            }

    
    }

    const equationForming = (value)=>{
    if (evaluateClear == 0)
    {
    var equation = operand + value
    setOperand(equation);
    try{
        setResult(eval(equation));
        setSubText(result);
    }
    catch
    {
        try{
        setResult(eval(equation.slice(0,equation.length-1)));
        setSubText(result);
        }
        catch
        {
            setSubText('Syntax Error!');
        }

    }
    }
    else if (evaluateClear == 1 && value in integers)
    {
        setOperand('');
        setOperand(value);
        setSubText(value);
        setResult(0);
        setEval(0);
    }
    else if(evaluateClear == 1 && (value in operators))
    {
    var equation = operand + value
    setOperand(equation);
    setEval(0);
    }
}

    const evaluate =() =>{
     historyFunction();
     setOperand(result);
     setSubText('');
     setEval(1);
    
}
    const clearText =()=>
    {
        setOperand('');
        setSubText('');
        setResult(0);
        setEval(0);
    }
    const clearSpaces =()=>
    {
        try {
            if(operand == 'Syntax Error!')
            {
                setOperand('');
            }
            else {
            var spaceClearEquation = operand.slice(0,operand.length-1);
            setOperand(spaceClearEquation);
            try{
                setResult(eval(spaceClearEquation));
                setSubText(result);
            }
            catch{
                try {
                setResult(eval(spaceClearEquation.slice(0,spaceClearEquation.length-1)))
                setSubText(result);
                }
                catch
                {
                    setSubText('Syntax Error!');
                }
            }
            }
        }
        catch {
            setOperand('');
        }
        
    
}

 const clearHistoryData =()=>

 {

    setHistory((prevHistory)=> 
    {prevHistory = []
    return prevHistory
    }
    );
 }

    return (
        
        <View style={styles.container}>
            <View style={styles.displayarea}>
            <Text style={styles.operandtext}>{operand}</Text>
            <Text style={styles.resulttext}>{subtext}</Text>
            <TouchableOpacity onPress={clearHistoryData}>
            <Text style={styles.clearhistory}>🗑️- Clear History</Text>
            </TouchableOpacity>
            <FlatList
             horizontal={true}
             data ={historyList}
             renderItem={({item}) =>
             <View style={styles.history}>
                <Text style={styles.historyText}>{item}</Text>
                </View>
                }
            
            />
            </View>
            <View style={styles.dialpad}>
            <View style={styles.keypad}>
            
                <View style ={styles.dialpadnumbers}>
                <TouchableOpacity onPress={clearText}>
                    <View style={styles.acandbackspace}>
                        <Text style ={styles.numbers}>C</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearSpaces}>
                    <View style={styles.acandbackspace}>
                        <Text style ={styles.numbers}>⌫</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            
            <DialPadRows number={1} symbol={'+'} equationForming={equationForming}/>
            <DialPadRows number={4} symbol={'-'} equationForming={equationForming}/>
            <DialPadRows number={7} symbol={'*'} equationForming={equationForming}/>
            <View style={styles.dialpadnumbers}>
            <TouchableOpacity onPress={()=>equationForming(0)}>
                <View style={styles.numberdiv}>
                    <Text style={styles.numbers}>0</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>equationForming('.')}>
                <View style={styles.symbols}>
                    <Text style={styles.numbers}>.</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={evaluate}>
                <View style={styles.symbols}>
                    <Text style={styles.numbers}>=</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>equationForming('/')}><View style={styles.symbols}><Text style={styles.numbers}>/</Text></View></TouchableOpacity>
            </View>
            </View>

            </View>                
        </View>
    )
    }

const styles =StyleSheet.create(
    {
        displayarea:
        {
            height:280,
            width:400,
        },
      dialpad:
      {
        height: 500 ,
        width : 420 ,
        backgroundColor : 'oldlace',
      }  ,
      keypad:
      {
        marginLeft : 15,
      },
      dialpadnumbers :
      {
      flexDirection : 'row',
      },
      numbers :
      {
        fontSize : 45 ,
        marginTop:10,
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
    },
    operandtext :
    {
        fontSize : 40,
        color : 'black' ,
        textAlign : 'right',
    } ,
    acandbackspace :
    {
        height : 70 ,
        width : 180 ,
        backgroundColor : 'tomato',
        marginLeft:10 ,
        marginBottom : 10,
        borderRadius : 25 ,
        marginTop : 5 ,
        justifyContent : 'center',
        alignItems : 'center',
    },
    resulttext :
    {
        fontSize : 20,
        textAlign : 'right',
    },
    history:
    {
        height : 50 ,
        backgroundColor :'coral',
        marginRight : 10,
        borderRadius : 10,
        justifyContent : 'center',
        alignContent:'center',
        marginTop:10,
    },
    historyText :
    {
        fontSize : 30,
        color :'white',
        marginRight : 10,
    },
    clearhistory :
    {
        fontSize: 30,
        marginTop : 70,
    }
    }
    
)

export default CalculatorApp