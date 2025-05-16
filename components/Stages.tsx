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
        path: 'land_selection',
      },
      {
        title: 'Pay Pre-Purchase Stage Fees',
        path: 'Pay_prepurchase',
      },
      {
        title: 'Site Visit',
        path: 'Site_visit',
      },
      {
        title: 'Site Plan Preparation',
        path: 'Site_plan_preparation',
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
        title: 'Land Payment & Purchase Stage Fees',
        path: '',
      },
      {
        title: 'Sales and Purchase Agreement',
        path: '',
      },
      {
        title: 'Conveynace',
        path: '',
      },
      {
        title: 'Oath of Proof',
        path: '',
      },
      {
        title: 'Mail & Document Sign Off',
        path: '',
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
        title: 'Stamp Duty',
        path: '',
      },
      {
        title: 'Consent/Concurrence Processing',
        path: '',
      },
      {
        title: 'Parcel Land Preparation',
        path: '',
      },
      {
        title: 'Land Title Certificate Issuance',
        path: '',
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
