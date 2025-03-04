import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import districtCityData from "@/assets/districts.json";

export default function CustomerGPSForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log("Form Data:", data);

  const vehicleCategory = watch("vehicleCategory");
  const district = watch("district");

  const [districts] = useState(Object.keys(districtCityData));
  const cities = district ? districtCityData[district] : [];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            Customer Data Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Owner & Driver Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Owner's Name</Label>
                <Input
                  {...register("ownerName", {
                    required: "Owner's name is required",
                  })}
                  placeholder="Enter owner's name"
                />
                {errors.ownerName && (
                  <span className="text-red-500 text-sm">
                    {errors.ownerName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Owner's Contact</Label>
                <Input
                  type="tel"
                  {...register("ownerContact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  placeholder="Enter contact number"
                />
                {errors.ownerContact && (
                  <span className="text-red-500 text-sm">
                    {errors.ownerContact.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Driver's Name</Label>
                <Input
                  {...register("driverName", {
                    required: "Driver's name is required",
                  })}
                  placeholder="Enter driver's name"
                />
                {errors.driverName && (
                  <span className="text-red-500 text-sm">
                    {errors.driverName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Driver's Contact</Label>
                <Input
                  type="tel"
                  {...register("driverContact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  placeholder="Enter contact number"
                />
                {errors.driverContact && (
                  <span className="text-red-500 text-sm">
                    {errors.driverContact.message}
                  </span>
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Number of Vehicles</Label>
                <Input
                  type="number"
                  {...register("vehicleCount", {
                    required: "Number of vehicles is required",
                    min: { value: 1, message: "Minimum 1 vehicle required" },
                  })}
                  placeholder="Enter number of vehicles"
                />
                {errors.vehicleCount && (
                  <span className="text-red-500 text-sm">
                    {errors.vehicleCount.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Vehicle Category</Label>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full justify-between font-normal text-gray-500 hover:bg-transparent hover:text-gray-500 cursor-pointer"
                    >
                      {vehicleCategory || "Select Vehicle Category"}
                      <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
                    {["Auto", "Car", "Bus", "Lorry", "Ambulance", "Other"].map(
                      (category) => (
                        <DropdownMenuItem
                          key={category}
                          onSelect={() =>
                            setValue("vehicleCategory", category, {
                              shouldValidate: true,
                            })
                          }
                        >
                          {category}
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.vehicleCategory && (
                  <span className="text-red-500 text-sm">
                    {errors.vehicleCategory.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Vehicle Number</Label>
              <Input
                {...register("vehicleNumber", {
                  required: "Vehicle number is required",
                  pattern: {
                    value: /^[A-Z]{2}\s?[0-9]{2}\s?[A-Z]{1,2}\s?[0-9]{4}$/,
                    message: "Please enter a valid vehicle number",
                  },
                })}
                placeholder="Enter vehicle number"
              />
              {errors.vehicleNumber && (
                <span className="text-red-500 text-sm">
                  {errors.vehicleNumber.message}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>District</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full justify-between"
                    >
                      {district || "Select District"}
                      <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
                    {districts.map((districtName) => (
                      <DropdownMenuItem
                        key={districtName}
                        onSelect={() => {
                          setValue("district", districtName, {
                            shouldValidate: true,
                          });
                          setValue("city", "", { shouldValidate: true }); // Reset city when district changes
                        }}
                      >
                        {districtName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.district && (
                  <span className="text-red-500 text-sm">
                    {errors.district.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>City</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full justify-between"
                      disabled={!district}
                    >
                      {watch("city") || "Select City"}
                      <ChevronDownIcon
                        className="-me-1 opacity-60"
                        size={16}
                        aria-hidden="true"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
                    {cities.map((city) => (
                      <DropdownMenuItem
                        key={city}
                        onSelect={() =>
                          setValue("city", city, { shouldValidate: true })
                        }
                      >
                        {city}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>

            {/* GPS & Tracking Details */}
            <div className="flex flex-col gap-2">
              <Label>Currently Installed GPS Brand</Label>
              <Input
                {...register("gpsBrand", { required: "GPS brand is required" })}
                placeholder="Enter GPS brand"
              />
              {errors.gpsBrand && (
                <span className="text-red-500 text-sm">
                  {errors.gpsBrand.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Yearly Renewal Rate</Label>
              <Input
                type="number"
                {...register("renewalRate", {
                  required: "Renewal rate is required",
                  min: { value: 0, message: "Renewal rate cannot be negative" },
                })}
                placeholder="Enter renewal rate"
              />
              {errors.renewalRate && (
                <span className="text-red-500 text-sm">
                  {errors.renewalRate.message}
                </span>
              )}
            </div>

            {/* Tracking Application Use */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Label className="sm:w-1/2">
                Use Tracking Application Regularly?
              </Label>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={"cursor-pointer"}
                    checked={watch("useTrackingApp") === "Yes"}
                    onCheckedChange={(checked) =>
                      setValue("useTrackingApp", checked ? "Yes" : "No", {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={"cursor-pointer"}
                    checked={watch("useTrackingApp") === "No"}
                    onCheckedChange={(checked) =>
                      setValue("useTrackingApp", checked ? "No" : "Yes", {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Label>No</Label>
                </div>
              </div>
            </div>

            {/* Satisfaction Survey */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Label className=" leading-6">
                Are you satisfied with your current GPS service?
              </Label>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={"cursor-pointer"}
                    checked={watch("gpsSatisfaction") === "Yes"}
                    onCheckedChange={(checked) =>
                      setValue("gpsSatisfaction", checked ? "Yes" : "No", {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className={"cursor-pointer"}
                    checked={watch("gpsSatisfaction") === "No"}
                    onCheckedChange={(checked) =>
                      setValue("gpsSatisfaction", checked ? "No" : "Yes", {
                        shouldValidate: true,
                      })
                    }
                  />
                  <Label>No</Label>
                </div>
              </div>
            </div>

            {/* GPS Replacement Interest */}
            <div className="flex flex-col gap-4">
              <Label className="leading-6">
                Would you replace your GPS device for the following benefits?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Insurance Discount",
                  "Spare Parts Discount",
                  "On-Road Assistance",
                  "Wheel Alignment Discount",
                  "Showroom Benefits",
                  "Towing Service",
                  "24/7 Assistance",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <Checkbox
                      {...register(`gpsReplacementBenefits.${benefit}`)}
                      className="cursor-pointer"
                    />
                    <Label>{benefit}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full cursor-pointer mt-4">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
