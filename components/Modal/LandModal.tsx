'use client';
import { useMemo, useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ModalHeader from './ModalHeader';

import { FaFileContract, FaFileSignature, FaIndustry } from 'react-icons/fa';
import { GrHomeRounded } from 'react-icons/gr';
import { ImOffice } from 'react-icons/im';
import { MdAgriculture } from 'react-icons/md';
import useLandModal from '@/hooks/useLandModal';
import CategoryInput from '../form-items/CategoryInput';
import LandArea from './LandArea';
import ImageUpload from '../form-items/ImageUpload';
import Minimap from '../Minimap';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import Input from '../form-items/Input';
import DocumentUpload from '../form-items/DocumentUpload';


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DOCUMENT = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

export const categories = [
  {
    label: 'Residential',
    icon: GrHomeRounded,
    description: 'Zoned for residential properties',
  },
  {
    label: 'Agricultural',
    icon: MdAgriculture,
    description: 'Agricultural land',
  },
  {
    label: 'Industrial',
    icon: FaIndustry,
    description: 'Industrial zone',
  },
  {
    label: 'Commercial',
    icon: ImOffice,
    description: 'Commercial zone',
  },
];

export const interestTypes = [
  {
    label: 'Leasehold',
    icon: FaFileContract,
    description: 'Leasehold',
  },
  {
    label: 'Freehold',
    icon: FaFileSignature,
    description: 'Freehold',
  },
  {
    label: 'Sub-lease',
    icon: FaFileSignature,
    description: 'Sublease',
  },
  {
    label: 'Tenancy',
    icon: FaFileSignature,
    description: 'Tenancy',
  },
  {
    label: 'License',
    icon: FaFileSignature,
    description: 'License',
  },
];

const LandModal = () => {
  const router = useRouter();
  const landModal = useLandModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      landArea: 1,
      otherLands: 1,
      interestType: '',
      imageSrc: [],
      price: 1,
      title: '',
      description: '',
      DeedCert : '',
      Indenture: '',
      searchresult: '',


    },
  });

 // const category = watch('category');
  //const location = watch('location');
 // const otherLands = watch('otherLands');
  const interestType = watch('interestType');
  const imageSrc = watch('imageSrc');
  const Indenture = watch('Indenture');
  const Deedcert = watch('Deedcert');
  const searchresult = watch('searchresult');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
   // axios
     // .post('/api/lands', data)
      //.then(() => {
        //toast.success('Land successfully created!');
        //router.refresh();
        //reset();
        //setStep(STEPS.CATEGORY);
        //landModal.onClose();
      //})
      //.catch(() => {
       // toast.error('Something went wrong!');
      //})
      //.finally(() => {
        //setIsLoading(false);
      //});
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8 ">
      <ModalHeader
        title="Type of Interest"
        subtitle="Pick one category and one interest type"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {interestTypes.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(interestType) => {
                setCustomValue('interestType', interestType);
              }}
              selected={interestType === item.label}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Where is the land located"
          subtitle="Help buyers find the land"
        />
       
        <Minimap />
      
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Share some details about the land"
          subtitle="What's the size of the land?"
        />
        <LandArea
          title="Land area"
          subtitle="Enter the area of your land"
          onChange={(value) => setCustomValue('landArea', value)}
        />
        <hr />
        {/* transaction type */}
        <div>
          <h1 className='font-medium m-2'>Transaction Type</h1>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Primary" id="r1" />
          <Label htmlFor="r1">Primary transaction (direct sale from Stool, Family, kin etc)</Label>
          </div>
          <div className="flex items-center space-x-2">
          <RadioGroupItem value="Secondary" id="r2" />
         <Label htmlFor="r2">Secondary transaction (any other sale after primary sale)</Label>
           </div>         
        </RadioGroup>
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Add a display image of your land"
          subtitle="Show buyers the current state of the land"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DOCUMENT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Land title/Deed certificate"
          subtitle="Pre-verification document (optional)"
        />
        <DocumentUpload
          value={Deedcert}
          onChange={(value) => setCustomValue('DeedCert', value)}
        />
         <ModalHeader
          title="Indenture"
          subtitle="Pre-verification document (optional)"
        />
     
        <DocumentUpload
          value={Indenture}
          onChange={(value) => setCustomValue('Indenture', value)}
        />
            <ModalHeader
          title="Search results"
          subtitle="Pre-verification document (optional)"
        />
       
        <DocumentUpload
          value={searchresult}
          onChange={(value) => setCustomValue('searchresult', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="How would you describe the land?"
          subtitle="Give a detailed description of the land"
        />
       <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
    /> 
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Set your price"
          subtitle="How much is the land selling for?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
    /> 
      </div>
    );
  }

  return (
    <Modal
      title="Add your land"
      isOpen={landModal.isOpen}
      onClose={landModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default LandModal;