import axiosInstance from "./api.ts";

export const fetchSkipsByLocation = async (postcode, area) => {
  try {
    const response = await axiosInstance.get("/skips/by-location", {
      params: { postcode, area },
    });
    console.log("response", response);
    return transformSkipData(response.data);
  } catch (error) {
    console.error("Error fetching skips:", error);
    throw new Error("Failed to fetch skips. Please try again.");
  }
};

const transformSkipData = (apiData) => {
  if (!Array.isArray(apiData)) {
    console.warn("Invalid API data format, expected array");
    return [];
  }

  return apiData.map((skip, index) => {
    const priceBeforeVat = Number.parseFloat(skip.price_before_vat) || 0;
    const vatPercentage = Number.parseFloat(skip.vat) || 0;
    const price = priceBeforeVat * (1 + vatPercentage / 100);

    const sizeNumber = parseInt(skip.size, 10) || 5; // Default to 5 if invalid
    const defaultImage = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${sizeNumber}-yarder-skip.jpg`;

    return {
      id: skip.id || `skip-${index}`,
      name: skip.name || `${skip.size} Yard Skip`,
      size: skip.size ? `${skip.size} Yards` : "Unknown",
      capacity: skip.description || skip.capacity || "Standard capacity",
      price: price || 0,
      hirePeriod: skip.hire_period_days
        ? `${skip.hire_period_days} day hire period`
        : "7 day hire period",
      image: skip.image_url || defaultImage, // Use dynamic image based on size
      allowedOnRoad: skip.allowed_on_road !== undefined ? skip.allowed_on_road : true,
      allowsHeavyWaste: skip.allows_heavy_waste !== undefined ? skip.allows_heavy_waste : false,
      transportCost: Number.parseFloat(skip.transport_cost) || 0,
    };
  });
};