import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonInput, IonItem, IonSelectOption, IonSelect, IonButton } from '@ionic/react';
import { UserClub, UserClubWorker, UserCommon, UserPlayer } from '../../types/user.types';
import { withContext } from '../../context/general.context';

interface signupProps {
  signup(arg: UserCommon): React.SetStateAction<{
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

        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput value={user.username ? user.username : ''} onIonChange={e => setUser({ ...user, username: e.detail.value ? e.detail.value : undefined })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel>City</IonLabel>
          <IonSelect value={user.city} placeholder="Select One" onIonChange={e => setUser({ ...user, city: e.detail.value })}>
            <IonSelectOption value="barcelona">Barcelona</IonSelectOption>
          </IonSelect>
        </IonItem>

        {type === 'clubWorker' && <IonItem>
          <IonLabel position="floating">Place</IonLabel>
          <IonInput value={(user as UserClubWorker).place ? (user as UserClubWorker).place : ''} onIonChange={e => setUser({ ...(user as UserClubWorker), place: e.detail.value ? e.detail.value : undefined })}></IonInput>
        </IonItem>}

        {type === 'club' && <IonItem>
          <IonLabel>TeamDimension</IonLabel>
          <IonSelect value={(user as UserClub).teamDimension ? (user as UserClub).teamDimension : ''} placeholder="Select One" onIonChange={e => setUser({ ...(user as UserClub), teamDimension: e.detail.value })}>
            <IonSelectOption value='nothing'>nothing</IonSelectOption>
            <IonSelectOption value="-9000">-9000</IonSelectOption>
            <IonSelectOption value="10000-20000">10000-20000</IonSelectOption>
            <IonSelectOption value="20000-50000">20000-50000</IonSelectOption>100000-
            <IonSelectOption value="50000-100000">50000-100000</IonSelectOption>
            <IonSelectOption value="100000-">100000-</IonSelectOption>
          </IonSelect>
        </IonItem>}

        {type === 'club' && <IonItem>
          <IonLabel>level</IonLabel>
          <IonSelect value={(user as UserClub).level} placeholder="Select One" onIonChange={e => setUser({ ...(user as UserClub), level: e.detail.value })}>
            <IonSelectOption value="amateur">amateur</IonSelectOption>
            <IonSelectOption value="semi-profesional">semi-profesional</IonSelectOption>
            <IonSelectOption value="profesional">profesional</IonSelectOption>
            <IonSelectOption value="manager">manager</IonSelectOption>
          </IonSelect>
        </IonItem>}

        <IonButton shape="round" fill="outline" onClick={async (e) => {
          e.preventDefault();
          if (!user.email || !user.password || !user.username || !user.city) {
            return 'hola'
          }
          if (type === 'player') {
            const nullValues = {
              picture: null,
              club_worker_id: null,
              club_id: null,
              selected: false
            }
            const data: UserPlayer = { ...nullValues, ...user, type }
            try {
              const res = props.signup(data);

            } catch (e) {
              console.log({ e })
            }
          }

          if (type === 'clubWorker') {
            if (!(user as UserClubWorker).place) {
              return
            }
            const nullValues = {
              picture: null,
              club_id: null,
              selected: false,
            }
            const data: UserClubWorker = { ...nullValues, ...(user as UserClubWorker), type }
            try {
              const res = props.signup(data);

            } catch (e) {
              console.log({ e })
            }
          }

          if (type === 'club') {
            if (!(user as UserClub).teamDimension || !(user as UserClub).level) {
              return
            }
            const data: UserClub = { ...(user as UserClub), type }
            try {
              const res = props.signup(data);

            } catch (e) {
              console.log({ e })
            }
          }
        }}>Sign up</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default withContext(Signup);
