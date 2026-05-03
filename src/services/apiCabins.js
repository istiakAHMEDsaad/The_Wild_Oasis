import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${import.meta.env.VITE_STORAGE_CABIN}/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // a) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

export async function deleteCabin(id) {
  // 1. First, get the cabin data to retrieve the image path
  const { data: cabin, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Cabin could not be found");
  }

  // 2. Delete the cabin record from the table
  const { error: deleteError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error("Cabin could not be deleted");
  }

  // 3. Delete the image from storage (if it exists and is stored in our bucket)
  if (cabin.image && cabin.image.startsWith(supabaseUrl)) {
    // Extract the image filename from the full URL
    // Example: https://...supabase.co/storage/v1/object/public/cabin-images/0.8503232138031065-tree_house_1.avif
    // We need: 0.8503232138031065-tree_house_1.avif
    const imagePath = cabin.image.split("/cabin-images/")[1];

    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .remove([imagePath]);

      if (storageError) {
        console.error("Storage deletion error:", storageError);
        // Note: We don't throw here because the cabin is already deleted
        // You could handle this differently based on your requirements
      }
    }
  }

  return cabin;
}
// export async function deleteCabin(id) {
//   const { error, data } = await supabase.from("cabins").delete().eq("id", id);

//   if (error) {
//     // eslint-disable-next-line no-console
//     console.error(error);
//     throw new Error("Cabins could not be deleted");
//   }

//   return data;
// }
