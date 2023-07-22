import React from "react";

export default function UpdateProfile({
  user,
  isUpating,
  toggleForm,
  handleChange,
  handleSubmit,
}) {
  return (
    <div>
      <h4>Edit Profile</h4>
      <form>
        <label>Description</label>
        <input
          className="register-input"
          value={user.description}
          onChange={handleChange}
          name="description"
          type="text"
          placeholder="Describe yourself"
        />

        <label>My eating and cooking preferences</label>
        <input
          className="register-input"
          value={user.preferences}
          onChange={handleChange}
          name="preferences"
          type="text"
          placeholder="Your eating and cooking preferences"
        />

        <label>Cooking Skills</label>
        <input
          className="register-input"
          value={user.cooking_skills}
          onChange={handleChange}
          name="cooking_skills"
          type="text"
          placeholder="Your cooking skills"
        />

        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}
