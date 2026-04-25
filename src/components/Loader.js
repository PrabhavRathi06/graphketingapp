import React from 'react';
import {View,StyleSheet} from 'react-native';

export default function Loader(){

return(
<View style={styles.container}>

<View style={styles.card}>
<View style={styles.lineLarge}/>
<View style={styles.lineMedium}/>
<View style={styles.lineSmall}/>
</View>

<View style={styles.card}>
<View style={styles.lineLarge}/>
<View style={styles.lineMedium}/>
<View style={styles.lineSmall}/>
</View>

<View style={styles.card}>
<View style={styles.lineLarge}/>
<View style={styles.lineMedium}/>
<View style={styles.lineSmall}/>
</View>

</View>
);

}

const styles=StyleSheet.create({
container:{
padding:16
},
card:{
padding:16,
marginBottom:12,
borderWidth:1,
borderRadius:8
},
lineLarge:{
height:18,
marginBottom:10,
backgroundColor:'#ddd'
},
lineMedium:{
height:14,
marginBottom:10,
backgroundColor:'#e5e5e5'
},
lineSmall:{
height:14,
width:'80%',
backgroundColor:'#eee'
}
});