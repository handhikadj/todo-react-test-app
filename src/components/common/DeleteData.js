import { Box, CircularProgress } from '@mui/material';
import deleteDataIconImg from '../../assets/images/delete-data-icon.png';

const DeleteData = ({
  descriptionText,
  isActivityGroup = false,
  onCancel,
  onConfirm,
  isDeleteLoading = false,
}) => (
  <Box className="delete-data delete-data-box">
    <img src={deleteDataIconImg} alt={deleteDataIconImg} />

    <p className="description-text">
      {isActivityGroup
        ? 'Apakah anda yakin menghapus activity'
        : 'Apakah anda yakin menghapus List Item'}
      <strong>&nbsp;"{descriptionText}"?</strong>
    </p>

    <div className="btn-dialog-container">
      <button
        disabled={isDeleteLoading}
        type="button"
        className="btn-dialog cancel"
        onClick={onCancel}
      >
        Batal
      </button>
      <button
        disabled={isDeleteLoading}
        type="button"
        className="btn-dialog confirm"
        onClick={onConfirm}
      >
        {isDeleteLoading ? (
          <CircularProgress size={20} color="inherit" thickness={5} />
        ) : (
          'Hapus'
        )}
      </button>
    </div>
  </Box>
);

export default DeleteData;
