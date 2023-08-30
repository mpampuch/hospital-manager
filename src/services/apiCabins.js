import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("wards").select("*");

  if (error) {
    console.error(error);
    throw new Error("Wards could not be loaded");
  }

  return data;
}

export async function createEditCabin(newWard, id) {
  const hasImagePath = newWard.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newWard.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newWard.image
    : `${supabaseUrl}/storage/v1/object/public/ward-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("wards");

  // A) CREATE
  if (!id) query = query.insert([{ ...newWard, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newWard, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Ward could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("ward-images")
    .upload(imageName, newWard.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("wards").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("wards").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Ward could not be deleted");
  }

  return data;
}
