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
              value="novice"
              checked={cookingSkills === "novice"}
              onChange={handleChange}
            />
            Novice chef
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="hobby"
              checked={cookingSkills === "hobby"}
              onChange={handleChange}
            />
            Hobby chef
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="competent"
              checked={cookingSkills === "competent"}
              onChange={handleChange}
            />
            Competent chef
          </label>
          <label>
            <input
              type="checkbox"
              name="cooking_skills"
              value="expert"
              checked={cookingSkills === "expert"}
              onChange={handleChange}
            />
            Expert chef
          </label>
        </div>

        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}
