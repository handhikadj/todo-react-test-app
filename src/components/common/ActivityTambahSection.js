import AddIcon from '@mui/icons-material/Add';

const ActivityTambahSection = () => (
  <div className="activity-tambah-section">
    <h1 className="title">Activity</h1>

    <button type="button" className="add-button">
      <AddIcon style={{ marginRight: '10px' }} />
      Tambah
    </button>
  </div>
);

export default ActivityTambahSection;
