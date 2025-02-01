export const FormHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        {title}
      </h1>
      <p className="mt-6 text-gray-700 sm:text-sm dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};
