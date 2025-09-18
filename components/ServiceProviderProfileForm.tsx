"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { banksInGhana, DistrictData } from "@/constants"
import { updateServiceProvider } from "@/lib/Appwrite/api"

const ServiceProviderProfileForm = ({ initialData }: { initialData: any }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(initialData || {})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      // TODO: hook this up to your API to save update
      await updateServiceProvider(formData)
      console.log("Updated Data:", formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="px-8 py-6 relative ring-2 ring-primary">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-2xl font-bold text-primary">
                  {formData?.Name_Entity?.charAt(0) || "SP"}
                </span>
              </div>
              <div className="text-center sm:text-left flex-1">
                 
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {formData?.Name_Entity || "Service Provider"}
                  </h1>
                
                
                  <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    {formData?.profession || "Professional"}
                  </div>
                
              </div>
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="bg-primary hover:bg-primary/70 text-white px-6 py-2"
              >
                {isEditing ? "Save" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </label>
                
                  <p className="text-gray-900 font-medium">
                    {formData?.Email || "Not provided"}
                  </p>
                
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    name="Phone"
                    value={formData?.Phone || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData?.Phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </label>
                {isEditing ? (
                  <Input
                    name="Country"
                    value={formData?.Country || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData?.Country || "Not provided"}
                  </p>
                )}
              </div>
              <div className="space-y-2">
  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
    District
  </label>
  {isEditing ? (
    <select
      name="District"
      value={formData?.District || ""}
      //@ts-ignore
      onChange={handleChange}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">Select a district</option>
      {DistrictData.map((district) => (
        <option key={district.ID} value={district.DISTRICT}>
          {district.DISTRICT}
        </option>
      ))}
    </select>
  ) : (
    <p className="text-gray-900 font-medium">
      {formData?.District || "Not provided"}
    </p>
  )}
</div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Official Address
                </label>
                {isEditing ? (
                  <Input
                    name="officialAddress"
                    value={formData?.officialAddress || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {formData?.officialAddress || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Membership
              </h2>
            </div>

            <div className="space-y-6">
              <div
                className={`${
                  formData?.VerifiedServiceProvider
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                } rounded-lg p-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      formData?.VerifiedServiceProvider
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    Status
                  </span>
                  <span
                    className={`${
                      formData?.VerifiedServiceProvider
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } text-xs font-semibold px-2 py-1 rounded-full`}
                  >
                    {formData?.VerifiedServiceProvider
                      ? "Verified"
                      : "Pending"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Membership ID */}
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-1">
                    Membership ID
                  </label>
                  {isEditing ? (
                    <Input
                      name="membershipID"
                      value={formData?.membershipID || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded-lg">
                      {formData?.membershipID || "Pending"}
                    </p>
                  )}
                </div>

                {/* Affiliation */}
                <div>
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-1">
                    Affiliation
                  </label>
                  {isEditing ? (
                    <Input
                      name="membershipAffiliation"
                      value={formData?.membershipAffiliation || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {formData?.membershipAffiliation || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 mt-8 ">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Payment Details
            </h2>
          </div>

          <div className="flex flex-row gap-6 justify-between max-w-5xl">
            {/* Bank Name */}
            <div className="space-y-2">
  <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
    Bank Name
  </label>
  {isEditing ? (
    <select
      name="Bank_Name"
      value={formData?.Bank_Name || ""}
      //@ts-ignore
      onChange={handleChange}
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="">Select a bank</option>
      {banksInGhana.map((bank) => (
        <option key={bank} value={bank}>
          {bank}
        </option>
      ))}
    </select>
  ) : (
    <p className="text-gray-900 font-medium">
      {formData?.Bank_Name || "Not provided"}
    </p>
  )}
</div>

            {/* Bank Details */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Account Number
              </label>
              {isEditing ? (
                <Input
                  name="Account_number"
                  value={formData?.Account_number || ""}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900 font-medium">
                  {formData?.Account_number || "Not provided"}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Account Name
              </label>
              {isEditing ? (
                <Input
                  name="Account_name"
                  value={formData?.Account_name || ""}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900 font-medium">
                  {formData?.Account_name || "Not provided"}
                </p>
              )}
            </div>

            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderProfileForm
