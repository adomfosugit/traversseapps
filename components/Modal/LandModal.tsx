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
import { uploadLand, getLoggedInUser } from '@/lib/Appwrite/api';



enum STEPS {
  CATEGORY = 0,
  LANDTYPE =1,
  LOCATION = 2,
  INFO = 3,
  IMAGES = 4,
  DOCUMENT = 5,
  DESCRIPTION = 6,
  LANDSTATUS =7,
  THIRD_PARTY_INTEREST =8,
  LETIGATION = 9,
  PRICE = 10,
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
export const status = [
  {
    label: 'Land title Certificate',
    icon:  FaFileContract,
    description: 'Land Title Certificate',
  },
  {
    label: 'Deed Certificate',
    icon:  FaFileContract,
    description: 'Agricultural land',
  },
  {
    label: 'Not Registered',
    icon:  FaFileContract,
    description: 'Industrial zone',
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
      location: null,
      landArea: 1,
      landtype:'',
      interestType: '',
      imageSrc: [],
      price: 1,
      title: '',
      description: '',
      DeedCert : '',
      Indenture: '',
      searchresult: '',
      transtype:'',
      landstatus:'',
      letigationencumberance: '',
      thirdpartyifyes:'',
      thirdpartyinterest: '',
    },
  });


  const landtype = watch('landtype');
  const transtype = watch('transtype');
  const interestType = watch('interestType');
  const imageSrc = watch('imageSrc');
  const Indenture = watch('Indenture');
  const DeedCert = watch('DeedCert');
  const searchresult = watch('searchresult');
  const landstatus = watch('landstatus');
  const letigationencumberance =watch('letigationencumberance')
  const thirdpartyinterest =watch('thirdpartyinterest')
  const thirdpartyifyes =watch('thirdpartyifyes')

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
  
    setIsLoading(true);
  
    try {
      const userEmail = await getLoggedInUser()
      data.userEmail = userEmail.email;
      data.price = parseFloat(data.price);
      const upload = await uploadLand(data); // Assuming uploadLand is an asynchronous function
      console.log(data);
    } catch (error) {
      console.error('Error uploading land data:', error);
    } finally {
      setIsLoading(false);
    }
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

  if (step === STEPS.LANDTYPE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Select your Land Zoning"
          subtitle="Help buyers find the land"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(landtype) => {
                setCustomValue('landtype', landtype);
              }}
              selected={landtype === item.label}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>
       
      </div>
    );
  }
  if (step === STEPS.LANDSTATUS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Land Registration Status"
          subtitle="where has your land been registered?"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {status.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(landstatus) => {
                setCustomValue('landstatus', landstatus);
              }}
              selected={landstatus === item.label}
              icon={item.icon}
              label={item.label}
            />
          </div>
        ))}
      </div>
       
      </div>
    );
  }
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Where is the land located"
          subtitle="Help buyers find the land"
        />
       {/*@ts-ignore */}
       <Minimap onChange={(value) => setCustomValue('location', value)}
      />
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
        {/* transaction type */}
        <div>
        <h1 className='font-medium m-2'>Transaction Type</h1>
        <RadioGroup 
           defaultValue={transtype}
           onValueChange={(value) => setCustomValue('transtype', value)}
        >
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
  if (step === STEPS.THIRD_PARTY_INTEREST) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Third Party Interest"
          subtitle="Does any third party have interest in the land?"
        />
        <hr />
        <div>
          <RadioGroup
          value={thirdpartyinterest} // Use value instead of defaultValue
          onValueChange={(value) => setCustomValue('thirdpartyinterest', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="r1" />
              <Label htmlFor="r1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="r2" />
              <Label htmlFor="r2">No</Label>
            </div>
          </RadioGroup>
        </div>
  
        {/* Conditionally render the document upload if "Yes" is selected */}
        {thirdpartyinterest === "Yes" && (
          <div className="mt-4">
            <ModalHeader
              title="Upload Third Party Interest Document"
              subtitle="Provide a document proving the third-party interest (e.g., lease agreement, contract)"
            />
            <DocumentUpload
              value={thirdpartyifyes}
              onChange={(value) => setCustomValue('thirdpartyifyes', value)}
         
            />
          </div>
        )}
      </div>
    );
  }
  if (step === STEPS.LETIGATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <ModalHeader
          title="Letigation or Encumbrance"
          subtitle="To the best of my knowledge, I certify that this land is free from any litigation and encumbrance "
        />
        
        <hr />
        
        <div>
        <RadioGroup 
           value={letigationencumberance} 
           onValueChange={(value) => setCustomValue('letigationencumberance', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="r3" />
            <Label htmlFor="r3">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="r4" />
            <Label htmlFor="r4">No</Label>
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
          title="Land title"
          subtitle="Pre-verification document "
        />
        <DocumentUpload
          value={DeedCert}
          onChange={(value) => setCustomValue('DeedCert', value)}
        />
         <ModalHeader
          title="Indenture"
          subtitle="Pre-verification document "
        />
     
        <DocumentUpload
          value={Indenture}
          onChange={(value) => setCustomValue('Indenture', value)}
        />
            <ModalHeader
          title="Search results"
          subtitle="Pre-verification document "
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
  type="number"
  step="0.01"  // Ensure decimals are allowed
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