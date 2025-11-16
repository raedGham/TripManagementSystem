<div>
  <label
    htmlFor="status"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Type
  </label>
  <select
    id="status"
    name="status"
    value={status}
    onChange={handleInputChange}
    required
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
  >
    <option value="">Select Type</option>
    <option value="active">Active</option>
    <option value="cancelled">Cancelled</option>
    <option value="confirmed">Confirmed</option>
    <option value="completed">Completed</option>
  </select>
</div>;
