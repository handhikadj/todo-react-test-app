import AddIcon from '@mui/icons-material/Add';
import { Dialog, Snackbar } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import activityEmptyStateImg from '../assets/images/activity-empty-state.png';
import activityItemDeleteButton from '../assets/images/activity-item-delete-button.png';
import DeleteData from '../components/common/DeleteData';
import { axiosInstance } from '../services/network/axiosUtils';
import activityDeletedIcon from '../assets/images/activity-deleted-icon.png';

const Dashboard = () => {
  const [activityGroups, setActivityGroups] = useState([]);
  const [selectedActivityGroup, setSelectedActivityGroup] = useState(null);
  const [openDeleteActivityDialog, setOpenActivityDialog] = useState(false);
  const [loadingDeleteActivityGroup, setLoadingDeleteActivityGroup] =
    useState(false);
  const [
    openActivityGroupDeletedSnackbar,
    setOpenActivityGroupDeletedSnackbar,
  ] = useState(false);

  const loadActivityGroups = async () => {
    const { data } = await axiosInstance.get(
      '/activity-groups?email=handika.dwij@gmail.com'
    );

    setActivityGroups(data.data);
  };

  const onAddActivityButtonClicked = async () => {
    await axiosInstance.post('/activity-groups', {
      title: 'New Activity',
      email: 'handika.dwij@gmail.com',
    });

    loadActivityGroups();
  };

  const onDeleteActivityButtonClicked = (activityGroup) => {
    setSelectedActivityGroup(activityGroup);
    setOpenActivityDialog(true);
  };

  const handleCloseDeleteActivityDialog = () => {
    setSelectedActivityGroup(null);
    setOpenActivityDialog(false);
    setLoadingDeleteActivityGroup(false);
  };

  const onConfirmDeleteActivityDialog = async (activityGroupId) => {
    if (!activityGroupId) return;

    setLoadingDeleteActivityGroup(true);
    await axiosInstance.delete(`/activity-groups/${activityGroupId}`);
    setLoadingDeleteActivityGroup(false);

    handleCloseDeleteActivityDialog();
    setOpenActivityGroupDeletedSnackbar(true);
    loadActivityGroups();
  };

  const onDialogClosed = (reason) => {
    if (reason === 'backdropClick' && loadingDeleteActivityGroup) return false;

    handleCloseDeleteActivityDialog();
  };

  useEffect(() => {
    loadActivityGroups();
  }, []);

  return (
    <div className="dashboard">
      <div className="activity-tambah-section">
        <h1 className="activity-group-title">Activity</h1>

        <button
          type="button"
          className="add-button"
          onClick={onAddActivityButtonClicked}
        >
          <AddIcon style={{ marginRight: '10px' }} />
          Tambah
        </button>
      </div>

      <div className="container-content-list activity-container">
        {!activityGroups.length ? (
          <img
            src={activityEmptyStateImg}
            alt={activityEmptyStateImg}
            onClick={onAddActivityButtonClicked}
            className="cursor-pointer"
          />
        ) : (
          activityGroups.map((activityGroup, index) => (
            <Link
              to={`/activity-group/${activityGroup.id}`}
              key={index}
              style={{ textDecoration: 'none' }}
            >
              <div className="activity-list">
                <h1 className="title h-full">{activityGroup.title}</h1>

                <div className="remark">
                  <span className="timestamp">
                    {dayjs(activityGroup.created_at).format('D MMMM YYYY')}
                  </span>
                  <img
                    src={activityItemDeleteButton}
                    alt={activityItemDeleteButton}
                    className="delete-activity"
                    onClick={(e) => {
                      e.preventDefault();
                      onDeleteActivityButtonClicked(activityGroup);
                    }}
                  />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <Dialog
        open={openDeleteActivityDialog}
        onClose={(e, reason) => onDialogClosed(reason)}
      >
        <DeleteData
          descriptionText={
            selectedActivityGroup ? selectedActivityGroup.title : ''
          }
          onCancel={handleCloseDeleteActivityDialog}
          onConfirm={() =>
            onConfirmDeleteActivityDialog(
              selectedActivityGroup ? selectedActivityGroup.id : null
            )
          }
          isDeleteLoading={loadingDeleteActivityGroup}
        />
      </Dialog>

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openActivityGroupDeletedSnackbar}
        onClose={() => setOpenActivityGroupDeletedSnackbar(false)}
        key="top center"
      >
        <div className="activity-deleted-toast">
          <img
            src={activityDeletedIcon}
            alt={activityDeletedIcon}
            className="activity-deleted-icon-img"
          />
          <span className="text">Activity berhasil dihapus</span>
        </div>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
