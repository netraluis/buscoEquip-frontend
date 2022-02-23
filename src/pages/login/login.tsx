import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonInput, IonItem, IonSelectOption, IonSelect, IonButton } from '@ionic/react';
import { UserClub, UserClubWorker, UserCommon, UserDoc, UserPlayer } from '../../types/user.types';
import { withContext } from '../../context/general.context';

interface signupProps {
  login(arg: UserDoc): React.SetStateAction<{
    isLoggedIn: boolean;
    isLoading: boolean;
    user: null;
    errorMessage: null;
  }>
}

const Signup: React.FC<signupProps> = (props): JSX.Element => {
  const [type, setType] = useState<undefined | string>('player')
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
        <IonSegment onIonChange={e => setType(e.detail.value)}>
          <IonSegmentButton value="clubWorker">
            <IonLabel>Entrenador</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="player">
            <IonLabel>Jugador</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="club">
            <IonLabel>club</IonLabel>
          </IonSegmentButton>
        </IonSegment>

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
            const res = props.login(data);

          } catch (e) {
            console.log({ e })
          }
        }}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default withContext(Signup);
