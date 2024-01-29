import { Card, ScrollShadow, CardBody, Divider, Button } from '@nextui-org/react';
import { workouts } from '../../workoutData';
import { useNavigate } from 'react-router';

const WorkoutsPage = () => {
  const navigate = useNavigate();
  return (
    <section className="page-wrapper">
      <div className="h-full w-full md:w-[80%] lg:w-[50%] flex flex-col items-center">
        <h1 className="text-foreground font-semibold text-3xl text-center">Workouts</h1>
        <Divider className="my-unit-md" />
        <ScrollShadow className="w-full flex-1" hideScrollBar size={50}>
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
                      <p className="font-bold text-md text-danger ml-auto">{`${workout.rounds}x`}</p>
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
        <Divider className="my-unit-md" />
        <div className="mt-auto w-full flex flex-col gap-unit-sm">
          <Button fullWidth variant="light" size="md" color="default" onPress={() => navigate('/')}>
            Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkoutsPage;
