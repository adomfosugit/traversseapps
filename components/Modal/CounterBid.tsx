'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Input from '../form-items/Input';
import Modal from './Modal';
import Header from '@/app/(main)/landlisting/Header';
import UnregisteredInput from '../form-items/UnregisteredInput';
import { getLoggedInUser, updateBid } from '@/lib/Appwrite/api';
import useCounterBidModal from '@/hooks/useCounterBidModal';

type TDetailQuery = {
  loId: string | null;
  BId: string | null;
  oP: number;
};

const CounterBidModal = () => {
  const bidModal = useCounterBidModal();
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();

  // Extract query parameters
  const currentQuery: TDetailQuery = {
    loId: params?.get('loId'),
    BId: params?.get('BId'),
    oP: Number(params?.get('oP')) || 0
  };

  const { 
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }, 
  } = useForm<FieldValues>({
    defaultValues: {
      offerPrice: currentQuery.oP,
      landOwnerId: currentQuery.loId,
      BidId: currentQuery.BId,
      offer: 0,
    }
  });

  // Watch form values
  const offerPrice = watch('offerPrice');
  const BidId = watch('BidId');
  const offer = watch('offer');

  // Update form values when query params change
  useEffect(() => {
    setValue('offerPrice', currentQuery.oP);
    setValue('landOwnerId', currentQuery.loId);
    setValue('BidId', currentQuery.BId);
  }, [currentQuery.oP, currentQuery.loId, currentQuery.BId, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // Get current user
      const currentUser = await getLoggedInUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Update the bid with counter offer
      await updateBid({
        $id: data.BidId,
        Owner_Decision: false, // Set to false for counter offer
        counterBid: parseFloat(data.offer)
      });

      toast.success('Counter offer submitted successfully!');
      bidModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header
        title="Negotiate Price"
        subtitle="Provide an amount to counter offer the given price"
      />
      <UnregisteredInput
        id="offerPrice"
        label="OfferPrice"
        disabled
        value={String(offerPrice) ?? '0'}
        placeholder={String(offerPrice) ?? '0'}
        required
        styles="bg-neutral-300"
      />
      <UnregisteredInput
        id="BidId"
        label="Bid ID"
        disabled
        value={BidId ?? ''}
        placeholder={BidId ?? ''}
        required
        styles="bg-neutral-300"
      />
      <Input
        id="offer"
        label="Your counter offer"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
    
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={bidModal.isOpen}
      title="Make a Counter Offer"
      actionLabel="Submit offer"
      onClose={bidModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CounterBidModal;