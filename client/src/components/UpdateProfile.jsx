import React from "react";

export default function UpdateProfile({
  user,
  isUpating,
  toggleForm,
  handleChange,
  handleSubmit,
  cookingSkills,
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
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="Novice"
              checked={cookingSkills === "Novice"}
              onChange={handleChange}
            />
            Novice chef
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="Hobby"
              checked={cookingSkills === "Hobby"}
              onChange={handleChange}
            />
            Hobby chef
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="Competent"
              checked={cookingSkills === "Competent"}
              onChange={handleChange}
            />
            Competent chef
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="Expert"
              checked={cookingSkills === "Expert"}
              onChange={handleChange}
            />
            Expert chef
          </label>
        </div>

        <button 
        className="btn btn-success py-1 btn-sm"
        type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}
