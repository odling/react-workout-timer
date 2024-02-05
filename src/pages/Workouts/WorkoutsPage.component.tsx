import { Card, ScrollShadow, CardBody, Divider } from '@nextui-org/react';
import { workouts } from '../../workoutData';
import { useNavigate } from 'react-router';
// import { useGetWorkoutsQuery } from '../../redux/features/workoutsApi';

const WorkoutsPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getWorkouts = async () => {
  //     const { data } = await supabase.from('workouts').select();
  //     console.log(data);
  //   };
  //   void getWorkouts();
  // }, []);

  // const { data: workoutData } = useGetWorkoutsQuery();

  return (
    <section className="page-wrapper">
      <h1 className="text-foreground font-semibold text-3xl text-center">Workouts</h1>
      <Divider className="my-unit-md" />
      <ScrollShadow className="w-full flex-1 min-h-[200px]" hideScrollBar size={50}>
        <ul className="flex-1 flex flex-col gap-unit-md px-unit-sm pb-unit-xs">
          {workouts.map((workout) => (
            <li key={workout.id}>
              <Card
                fullWidth
                shadow="sm"
                radius="md"
                isHoverable
                isPressable
                onPress={() => navigate(workout.id)}
              >
                <CardBody>
                  <div className="w-full flex justify-between items-center text-foreground gap-unit-sm">
                    <p className="font-bold text-md break-all">{workout.description}</p>
                    <p className="font-bold text-md text-success ml-auto">{`${workout.rounds}x`}</p>
                    <div className="flex flex-col items-center">
                      <span className={`font-semibold text-md text-foreground`}>
                        {
                          workout.exercises.filter((exercise) => exercise.type === 'exercise')
                            .length
                        }
                      </span>
                      <span className="font-normal text-xs">Exercises</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </ScrollShadow>
      <Divider className="mt-unit-md" />
    </section>
  );
};

export default WorkoutsPage;
