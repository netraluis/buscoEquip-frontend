import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonInput, IonItem, IonSelectOption, IonSelect, IonButton } from '@ionic/react';
import {  UserCommon, UserDoc } from '../../types/user.types';
import { withContext } from '../../context/general.context';

interface loginProps {
  login(arg: UserDoc): React.SetStateAction<{
    isLoggedIn: boolean;
    isLoading: boolean;
    user: null;
    errorMessage: null;
  }>
}

const Login: React.FC<loginProps> = (props): JSX.Element => {
  const [user, setUser] = useState<Partial<UserCommon>>({
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SegmentExamples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={user.email ? user.email : ''} onIonChange={e => setUser({ ...user, email: e.detail.value ? e.detail.value : undefined })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={user.password ? user.password : ''} onIonChange={e => setUser({ ...user, password: e.detail.value ? e.detail.value : undefined })}></IonInput>
        </IonItem>


        <IonButton shape="round" fill="outline" onClick={async (e) => {
          e.preventDefault();
          if (!user.email || !user.password) {
            return 'hola'
          }
          const data: UserDoc = user
          try {
            console.log({data})
            const res = props.login(data);

          } catch (e) {
            console.log({ e })
          }
        }}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default withContext(Login);
