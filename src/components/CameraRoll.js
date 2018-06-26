import { ImagePicker, Permissions } from 'expo';

const imagePicker = async () => {
  //Android permission not working with expo so cannot use CameraRoll right now, use ImagePicker from 'expo' instead
  // You can use the Permission API from 'expo' for permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync(
        {
          allowsEditing: false,
          mediaTypes: 'Images',
          quality: 0.4
        }
      );
      return result;
    }
};

export { imagePicker };
