import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading = true, size = 50, color = "#007bff" }) => {
  return (
    <div style={styles.container} data-testid="loader">
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  }
};

export default Loader;
