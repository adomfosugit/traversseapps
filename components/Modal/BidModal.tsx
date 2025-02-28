'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '../form-items/Input';
import Modal from './Modal';
import useBidModal from '@/app/hooks/useBidModal';
import Header from '@/app/(main)/landlisting/Header';
import UnregisteredInput from '../form-items/UnregisteredInput';
import { getLoggedInUser, submitBid } from '@/lib/Appwrite/api';

const BidModal = () => {
  const bidModal = useBidModal();
  const [isLoading, setIsLoading] = useState(false);
 const params = useSearchParams();

 type TDetailQuery = {
  loId:string | null;
  lId:string | null;
  oP:number;
 }
  let currentQuery: TDetailQuery = { loId: '', lId: '', oP: 0 };

  if (params?.get('lId')) {
    currentQuery.lId = params?.get('lId');
  }
  if (params?.get('loId')) {
    currentQuery.loId = params?.get('loId');
  }
  if (params?.get('oP')) {
    currentQuery.oP = Number(params?.get('oP'));
  }

  const [originalPrice, setOriginalPrice] = useState(currentQuery.oP);
  const [landOwnerId, setLandOwnerId] = useState(currentQuery.loId);
  const [landId, setLandId] = useState(currentQuery.lId);

  useEffect(() => {
    setLandId(currentQuery.lId);
    setLandOwnerId(currentQuery.loId);
    setOriginalPrice(currentQuery.oP);
  }, [currentQuery.oP, currentQuery.loId, currentQuery.lId, isLoading]);  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      originalPrice: originalPrice,
      landOwnerId: landOwnerId,
      landId: landId,
      offer: 0,
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  
    setIsLoading(true);
  
    try {
      const BidderEmail = await getLoggedInUser();
      data.landOwnerId = landOwnerId;
      data.originalPrice = originalPrice;
      data.BidderEmail = BidderEmail.email;
      data.landId = landId;
      data.offer = parseFloat(data.offer)
  
      // Validate required fields
      if (!data.landOwnerId || !data.originalPrice || !data.landId) {
        toast.error('Error retrieving data, please refresh and try again');
        return;
      }
  
      const submitbid = await submitBid(data);
  
      // Check if the bid submission was successful
      if (!submitbid.success) {
        toast.error(submitbid.error);
        return;
      }
  
      toast.success('Bid submitted successfully!');
     
  
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
      bidModal.onClose(); // Close the modal if applicable
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header
        title="Negotiate Price"
        subtitle="Provide an amount to counter offer the given price"
      />
      <UnregisteredInput
        id="originalPrice"
        label="Original price"
        disabled
        value={String(originalPrice) ?? 0}
        placeholder={String(originalPrice) ?? ''}
        required
        styles="bg-neutral-300"
      />
      <Input
        id="offer"
        label="Offer amount"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  if (!currentQuery.lId || !currentQuery.loId || !currentQuery.oP) {
    return <div></div>;
  } else {
    return (
      <Modal
        disabled={isLoading}
        isOpen={bidModal.isOpen}
        title="Register"
        actionLabel="Submit offer"
        onClose={bidModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
    );
  }
};

export default BidModal;
