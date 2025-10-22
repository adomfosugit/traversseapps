import { ReactElement } from 'react';
import StageIcon from './StageIcon';

export type TDrawerStage = {
  id: string;
  title: string;
  path: string;
  icon: ReactElement;
  iconDone: ReactElement;
  subNavigation: {
    title: string;
    path: string;
  }[];
};

export const landPurchaseStages: TDrawerStage[] = [
  {
    id: '1',
    title: 'Pre-purchase Stage',
    path: '',
    icon: <StageIcon iconNumber="1" />,
    iconDone: <StageIcon iconNumber="1" />,
    subNavigation: [
      {
        title: 'Land Selection',
        path: 'Land_selection',
      },
      {
        title: 'Pay For Due Diligence',
        path: 'Pay_prepurchase',
      },
      {
        title: 'Site Visit & Survey',
        path: 'Site_visit',
      },
      {
        title: 'Planning/Zoning Search',
        path: 'planning_zoning',
      },
      {
        title: 'Lands Commission Search',
        path: 'LC_search',
      },
      {
        title: 'Legal Advice',
        path: 'legal_advice',
      },
   
    ],
  },
  {
    id: '2',
    title: 'Purchase Stage',
    path: '',
    icon: <StageIcon iconNumber="2" />,
    iconDone: <StageIcon iconNumber="2" />,
    subNavigation: [
      
      {
        title: 'Sales and Purchase Agreement',
        path: 'Sales_Purchase',
      },
      {
        title: 'Purchase Stage Fees',
        path: 'Land_Payment_Purchase',
      },
     
      {
        title: 'Conveynace',
        path: 'Conveyance',
      },
      {
        title: 'Oath of Proof',
        path: 'Oath_Proof',
      },
      {
        title: 'Mail & Document Sign Off',
        path: 'Mail_Document_Sign_off',
      },
    ],
  },
  {
    id: '3',
    title: 'Land Registration Stage',
    path: '',
    icon: <StageIcon iconNumber="3" />,
    iconDone: <StageIcon iconNumber="2" />,
    subNavigation: [
      {
        title: 'Land Registration Fees',
        path: 'Registration',
      },
      {
        title: 'Stamp Duty',
        path: 'Stamp_Duty',
      },
      {
        title: 'Consent/Concurrence Processing',
        path: 'Concurrence_Processing',
      },
      {
        title: 'Parcel Land Preparation',
        path: 'Parcel_preparation',
      },
      {
        title: 'Land Title Certificate Issuance',
        path: 'Land_Title_Certificate',
      },
    ],
  },
];

export const buildingStages: TDrawerStage[] = [
  {
    id: '4',
    title: 'Pre-Contract Stage',
    path: '',
    icon: <StageIcon iconNumber="1" />,
    iconDone: <StageIcon iconNumber="2" />,
    subNavigation: [
      {
        title: 'Land selection',
        path: '',
      },
      {
        title: 'Pay Pre- Purchase Stage Fees',
        path: '',
      },
      {
        title: 'Site Visit',
        path: '',
      },
      {
        title: 'Site Plan Preparation',
        path: '',
      },
      {
        title: 'Lands Commission Due Diligence',
        path: '',
      },
      {
        title: 'Due Diligence Report & Legal Advise',
        path: '',
      },
      {
        title: 'Final Site Plan Preparation',
        path: '',
      },
    ],
  },
  {
    id: '5',
    title: 'Superstructure',
    path: '',
    icon: <StageIcon iconNumber="2" />,
    iconDone: <StageIcon iconNumber="2" />,
    subNavigation: [
      {
        title: 'Site Visit',
        path: '',
      },
      {
        title: 'Site Plan Preparation',
        path: '',
      },
    ],
  },
  {
    id: '6',
    title: 'Finishing',
    path: '',
    icon: <StageIcon iconNumber="3" />,
    iconDone: <StageIcon iconNumber="2" />,
    subNavigation: [
      {
        title: 'Land selection',
        path: '',
      },
      {
        title: 'Pay Pre- Purchase Stage Fees',
        path: '',
      },
    ],
  },
  {
    id: '7',
    title: 'Furnishing',
    path: '',
    icon: <StageIcon iconNumber="4" />,
    iconDone: <StageIcon iconNumber="2" />,
    subNavigation: [
      {
        title: 'Land selection',
        path: '',
      },
      {
        title: 'Pay Pre- Purchase Stage Fees',
        path: '',
      },
    ],
  },
];
