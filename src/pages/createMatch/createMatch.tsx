import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonItem, IonButton, IonTextarea } from '@ionic/react';
import { UserClub, UserClubWorker, UserCommon, UserDoc, UserPlayer } from '../../types/user.types';
import { withContext } from '../../context/general.context';
import { MatchDoc } from '../../types/match.types';

interface Props {
  createMatch(arg: MatchDoc): React.SetStateAction<{
    isLoggedIn: boolean;
    isLoading: boolean;
    user: null;
    errorMessage: null;
  }>
}

const CreateMatch: React.FC<Props> = (props): JSX.Element => {
  const [match, setMatch] = useState<Partial<MatchDoc>>({
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
          <IonLabel position="floating">Título</IonLabel>
          <IonInput value={match.title ? match.title : ''} onIonChange={e => setMatch({ ...match, title: e.detail.value ? e.detail.value : undefined })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel >Descripción</IonLabel>
          <IonTextarea rows={6} cols={20} placeholder="Enter any notes here..." value={match.description ? match.description : ''} onIonChange={e => setMatch({ ...match, description: e.detail.value ? e.detail.value : undefined })}></IonTextarea>
        </IonItem>



        <IonButton shape="round" fill="outline" onClick={async (e) => {
          e.preventDefault();
          if (!match.title || !match.description) {
            console.log('en el if')
            return 'hola'
          }
          try {
            const res = props.createMatch(match as MatchDoc);
            console.log({ res })

          } catch (e) {
            console.log({ e })
          }
        }}>Crear una oferta</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default withContext(CreateMatch);