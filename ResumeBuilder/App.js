import { ResumeProvider } from './ResumeContext';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import MainScreen from './screens/MainScreen';
import SplashScreen from './screens/SplashScreen';
import ResumeOptionScreen from './screens/ResumeOptionScreen';
import PersonalInformation from './screens/PersonalInformation';
import ObjectiveScreen from './screens/ObjectiveScreen';
import ProfessionalExperience from './screens/ProfessionalExperience';
import EducationScreen from './screens/EducationScreen';

import EditExperience from './screens/EditExperience';
import EditEducation from './screens/EditEducation';

import PreviewScreen from './screens/PreviewScreen';



const MainStack = () => {
  return(
    <Stack.Navigator initialRouteName='Splash' screenOptions={{
        headerShown: true,
    headerStyle: {
      backgroundColor: '#1b1b1b',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',

    }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainScreen}  />
      <Stack.Screen name='options' component={ResumeOptionScreen} />
      <Stack.Screen name='PersonalInformation' component={PersonalInformation} />
      <Stack.Screen name='ObjectiveScreen' component={ObjectiveScreen} />
      <Stack.Screen name='ProfessionalExperience' component={ProfessionalExperience} />
      <Stack.Screen name='EducationScreen' component={EducationScreen} />
      
      <Stack.Screen name='EditExperience' component={EditExperience} />
      <Stack.Screen name="EditEducation" component={EditEducation} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />


      






      

      
    </Stack.Navigator>

  );
};

const App = () => {
  return (
    <ResumeProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='MainStack' screenOptions={{
        title : "Resumes",
        headerTintColor : 'white',
        headerTitleStyle :{
          color : 'white',

        },
        drawerStyle :{
          backgroundColor : '#1b1b1b',
          width : 240,

        },
        drawerLabelStyle : {
          color : 'white',

        },
        headerStyle:{
          backgroundColor : '#1b1b1b',
        }
      }}>
        <Drawer.Screen name ="MainStack"
         component={MainStack}
          options={{
            headerShown : false,
            title : "Main",
            drawerLabel: () => null,
            drawerItemStyle: { height: 0 },


          }} />
      </Drawer.Navigator>
    </NavigationContainer>
    </ResumeProvider>
    
  );
}

export default App;

